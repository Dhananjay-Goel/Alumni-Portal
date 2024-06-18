import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, storage } from '../firebase'; // Import Firestore and Firebase Storage instances
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import storage functions
import StateContext from '../StateContext.js'; // Import StateContext for managing user login status

const toastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

const Constitution = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLink, setPdfLink] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const isAdmin = localStorage.getItem("isAdmin"); // Get admin status from localStorage

  // Function to handle form submission and updating Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      toast.error('Please select a PDF file');
      return;
    }
    setLoading(true);

    try {
      // Upload PDF file to Firebase Storage
      const storageRef = ref(storage, `constitution/${pdfFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, pdfFile);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Error uploading PDF file:', error);
          toast.error('Failed to upload PDF file');
        },
        () => {
          // Once the upload is complete, get the download URL and update Firestore
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Check if the document exists
            const constitutionRef = doc(db, 'Constitution', 'document-id'); // Replace 'document-id' with the actual document ID
            const docSnap = await getDoc(constitutionRef);
            if (docSnap.exists()) {
              // Update the existing document
              await updateDoc(constitutionRef, { link: downloadURL });
            } else {
              // Create a new document
              await setDoc(constitutionRef, { link: downloadURL });
            }
            setPdfLink(downloadURL);
            toast.success('PDF file uploaded successfully');
            window.location.reload(); // Reload the page after successful upload

          });
        }
      );
    } catch (error) {
      console.error('Error updating PDF link:', error);
      toast.error('Failed to update PDF link');
    }

    setLoading(false);
  };

  // Fetch PDF link from Firebase Firestore on component mount
  useEffect(() => {
    const fetchPdfLink = async () => {
      setLoading(true);
      try {
        // Fetch the Constitution document from Firestore
        const docRef = doc(db, 'Constitution', 'document-id'); // Replace 'document-id' with the actual document ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // If the document exists, set the PDF link from the document data
          setPdfLink(docSnap.data().link);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching PDF link:', error);
        toast.error('Failed to fetch PDF link');
      }
      setLoading(false);
    };

    fetchPdfLink();
  }, []);

  // Function to handle message from iframe containing content height
  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) return; // Check the origin for security
    const { height } = event.data;
    const iframe = document.getElementById('pdfViewer');
    if (iframe) {
      iframe.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <div className='flex flex-col items-center justify-center bg-slate-200 w-full h-[120px] gap-2'>
        <p className='text-black font-bold font-serif text-[36px]'>Constitution</p>
      </div>

      <div className="flex justify-center mt-4">
        {editing ? (
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="border border-gray-400 px-4 py-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded mt-4 mb-4">
              Upload
            </button>
          </form>
        ) : (
            <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <iframe
              src={`${pdfLink}#page=1`}
              id="pdfViewer"
              title="PDF Viewer"
              width="1000px" // Adjust the width here
              height="1000"
              style={{ border: 'none' }}
            />
            {isAdmin === 'true' && (
                <button onClick={() => setEditing(!editing)} className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mt-4">
                {editing ? 'Cancel' : 'Upload PDF'}
              </button>
            )}
            
          </div>
        )}
      </div>
      <ToastContainer {...toastOptions} />
    </div>
  );
};

export default Constitution;
