import React, { useState } from 'react';
import './NewsAndUpdatesAdmin.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {db} from "../firebase.js";
import { addDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import {storage} from "../firebase.js";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

function NewsAndUpdatesAdmin() {
  const [newsHeading, setNewsHeading] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [newsImage, setNewsImage] = useState(null);
  const [newsurl, setNewsUrl ] = useState('');
  const [newsletterHeading, setnewsletterHeading ] = useState('');
  const [newsletterpdf, setNewsletterpdf] = useState(null);
  const [newsletterImage, setNewsletterImage] = useState(null);
  

  const handleNewsChange = (e) => {
    setNewsImage(e.target.files[0]);
  };

  const handleNewsletterChange = (e) => {
    setNewsletterpdf(e.target.files[0]);
  };

  const handleNewsletterimageChange = (e) => {
    setNewsletterImage(e.target.files[0]);
  };

  const handleAddNews = async () => {
    if (!newsHeading || !newsDescription) {
      alert('Please fill in all fields');
      return;
    }
    if(newsImage){
      const storageRef = ref(storage,`/news/${newsImage.name}`)
      const uploadTask = uploadBytesResumable(storageRef, newsImage);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              
          },
          (error) => {
              console.log("Error uploading file:", error);
          },
          async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("URL: ", url);
                setNewsUrl(url);
            
                const querySnapshot = await getDocs(
                    query(collection(db, 'NewsUpdates'), where('Heading', '==', newsHeading))
                );
            
                if (!querySnapshot.empty) {
                    // If a document with the same heading exists, update it
                    const docRef = querySnapshot.docs[0].ref;
                    await updateDoc(docRef, {
                        Description: newsDescription,
                        NewsUrl: url
                    });
                    toast.success("News Updated Successfully", toastOptions);

                    setNewsHeading('');
                    setNewsDescription('');
                    setNewsImage(null);
                    window.location.reload();
                } else {
                    // If no document with the same heading exists, create a new one
                    const docRef = await addDoc(collection(db, 'NewsUpdates'), {
                        id: Date.now(),
                        Heading: newsHeading,
                        Description: newsDescription,
                        NewsUrl: url
                    });
                    toast.success("News Updated Successfully", toastOptions);

                    setNewsHeading('');
                    setNewsDescription('');
                    setNewsImage(null);
                    window.location.reload();
                }
            } catch (error) {
                console.log("Error getting download URL or saving data:", error);
            }
          }
      ); 
    }
    else{
      const querySnapshot = getDocs(
          query(collection(db, 'NewsUpdates'), where('Heading', '==', newsHeading))
      );
      console.log(querySnapshot.empty);
      if (querySnapshot.empty) {
          // If a document with the same heading exists, update it
          const docRef = querySnapshot.docs[0].ref;
          updateDoc(docRef, {
              Description: newsDescription
          });
          toast.success("News Updated Successfully", toastOptions);

          setNewsHeading('');
          setNewsDescription('');
          window.location.reload();
      } else {
          // If no document with the same heading exists, create a new one
          const docRef = addDoc(collection(db, 'NewsUpdates'), {
              id: Date.now(),
              Heading: newsHeading,
              Description: newsDescription
          });
          toast.success("News Updated Successfully", toastOptions);

          setNewsHeading('');
          setNewsDescription('');
          window.location.reload();
      }
    }

  };

  const handleAddNewsletter = async () => {
    if (!newsletterHeading || !newsletterpdf ) {
      alert('Please fill in all fields');
      return;
    }

    if(newsletterImage){
  
      const storageRefPdf = ref(storage,`/newsletter/${newsletterpdf.name}`)
      const uploadTaskPdf = uploadBytesResumable(storageRefPdf, newsletterpdf);
      uploadTaskPdf.on(
          "state_changed",
          (snapshot) => {
          },
          (error) => {
              console.log("Error uploading PDF file:", error);
          },
          async () => {
              try {
                const pdfUrl = await getDownloadURL(uploadTaskPdf.snapshot.ref);
                console.log("PDF URL: ", pdfUrl);
    
                const storageRefImage = ref(storage,`/newsletter/${newsletterImage.name}`)
                const uploadTaskImage = uploadBytesResumable(storageRefImage, newsletterImage);
                uploadTaskImage.on(
                    "state_changed",
                    (snapshot) => {
                        
                    },
                    (error) => {
                        console.log("Error uploading image file:", error);
                    },
                    async () => {
                        try {
                          const imageUrl = await getDownloadURL(uploadTaskImage.snapshot.ref);
                          console.log("Image URL: ", imageUrl);
                          const querySnapshot = await getDocs(
                              query(collection(db, 'NewsUpdates'), where('Heading', '==', newsletterHeading))
                          );
                          if (!querySnapshot.empty) {
                            const docRef = querySnapshot.docs[0].ref;
                            await updateDoc(docRef, {
                              PdfUrl: pdfUrl,
                              ImageUrl: imageUrl
                            });
                          }
                          else {
                            await addDoc(collection(db, 'Newsletters'), {
                              id: Date.now(),
                              MonthYear: newsletterHeading,
                              PdfUrl: pdfUrl,
                              ImageUrl: imageUrl
                            });
                          }
                          toast.success("Newsletter Updated Successfully", toastOptions);
                          setnewsletterHeading('');
                          setNewsletterpdf(null);
                          setNewsletterImage(null);
                          window.location.reload();
    
                        } catch (error) {
                          console.log("Error getting image download URL or saving data:", error);
                        }
                    }
                );
              } catch (error) {
                  console.log("Error getting PDF download URL:", error);
              }
          }
      );
    }
    else{
      const storageRefPdf = ref(storage,`/newsletter/${newsletterpdf.name}`)
      const uploadTaskPdf = uploadBytesResumable(storageRefPdf, newsletterpdf);
      uploadTaskPdf.on(
          "state_changed",
          (snapshot) => {
          },
          (error) => {
              console.log("Error uploading PDF file:", error);
          },
          async () => {
              try {
                const pdfUrl = await getDownloadURL(uploadTaskPdf.snapshot.ref);
                console.log("PDF URL: ", pdfUrl);

                const querySnapshot = await getDocs(
                    query(collection(db, 'NewsUpdates'), where('Heading', '==', newsletterHeading))
                );
                if (!querySnapshot.empty) {
                  const docRef = querySnapshot.docs[0].ref;
                  await updateDoc(docRef, {
                    PdfUrl: pdfUrl
                  });
                }
                else {
                  await addDoc(collection(db, 'Newsletters'), {
                    id: Date.now(),
                    MonthYear: newsletterHeading,
                    PdfUrl: pdfUrl
                  });
                }
              toast.success("Newsletter Updated Successfully", toastOptions);
              setnewsletterHeading('');
              setNewsletterpdf(null);
              setNewsletterImage(null);
              window.location.reload();
              } catch (error) {
                  console.log("Error getting PDF download URL:", error);
              }
          }
      );
    }
  };
  

  return (
    <div className="news-admin">
        <div className='news-updates-heading-admin'>
          <h1><FontAwesomeIcon icon={faNewspaper} /> News and Updates</h1>
        </div>
      <div className='news-update'>
        <div className="news-input-container">
          <h1>Update News</h1>
          <label>
            News Heading:
            <input
              type="text"
              value={newsHeading}
              onChange={(e) => setNewsHeading(e.target.value)}
            />
          </label>
          <label>
            News Description:
            <textarea
              value={newsDescription}
              onChange={(e) => setNewsDescription(e.target.value)}
            />
          </label>
          <label>
            News Image:
            <input name= "profilepic" type="file" accept="image/*" onChange={handleNewsChange} />
          </label>
          <button onClick={handleAddNews}>Add News</button>
        </div>

        <div className="news-input-container">
          <h1>Update NewsLetters</h1>
          <label>
            Newsletter Month/Year:
            <input
              type="text"
              value={newsletterHeading}
              onChange={(e) => setnewsletterHeading(e.target.value)}
            />
          </label>
          <label>
            NewsLetter Pdf:
            <input name="profilepic" type="file" accept="application/pdf" onChange={handleNewsletterChange} />
          </label>
          <label>
            NewsLetter Image:
            <input name= "profilepic" type="file" accept="image/*" onChange={handleNewsletterimageChange} />
          </label>
          <button onClick={handleAddNewsletter}>Add News</button>
        </div>
      </div>
    </div>
  );
}

export default NewsAndUpdatesAdmin;
