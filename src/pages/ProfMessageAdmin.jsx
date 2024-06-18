import React, { useState } from 'react';
import './ProfMessageAdmin.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {db} from "../firebase.js";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import {storage} from "../firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
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

function ProfMessageAdmin() {
  const [messageHeading, setMessageHeading] = useState('');
  const [author, setAuthor] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [messageDescription, setMessageDescription] = useState('');
  const [profImage, setProfImage] = useState(null);
  const [imageurl, setImageUrl ] = useState('');

  const handleMessageChange = (e) => {
    setProfImage(e.target.files[0]);
  };

  const handleAddMessage = async () => {
    if (!messageHeading || !messageDescription || !author || !authorEmail) {
      alert('Please fill in all fields');
      return;
    }
    const messageData = {
      Author: author,
      Heading: messageHeading,
      Description: messageDescription,
      ImageUrl: '',
    };
    const existingDoc = await getDoc(doc(db, 'professorMessages', authorEmail));

    if (existingDoc.exists()) {
      // If the document exists, update its data
      if (profImage) {
        // If a new image is provided, upload and update the image URL
        const storageRef = ref(storage, `/prof-message/${profImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, profImage);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log("Error uploading file:", error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("URL: ", url);
              messageData.ImageUrl = url;
              await setDoc(doc(db, 'professorMessages', authorEmail), {
                ...existingDoc.data(),
                ...messageData,
              });
              toast.success("Message Updated Successfully", toastOptions);
            } catch (error) {
              console.log("Error getting download URL or saving data:", error);
            }
          }
        );
      } else {
        // If no new image is provided, update the document without changing the image
        await setDoc(doc(db, 'professorMessages', authorEmail), {
          ...existingDoc.data(),
          ...messageData,
        });
        toast.success("Message Updated Successfully", toastOptions);
      }
    } else {
      // If the document doesn't exist, add a new document to the database
      if (profImage) {
        // If a new image is provided, upload and set the image URL
        const storageRef = ref(storage, `/prof-message/${profImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, profImage);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log("Error uploading file:", error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("URL: ", url);
              messageData.ImageUrl = url;
              await setDoc(doc(db, 'professorMessages', authorEmail), messageData);
              toast.success("Message Added Successfully", toastOptions);
            } catch (error) {
              console.log("Error getting download URL or saving data:", error);
            }
          }
        );
      } else {
        // If no image is provided, set the document without an image URL
        await setDoc(doc(db, 'professorMessages', authorEmail), messageData);
        toast.success("Message Added Successfully", toastOptions);
      }
    }
    setMessageHeading('');
    setMessageDescription('');
    setAuthor('');
    setAuthorEmail('');
    setProfImage(null);
  };

  return (
    <div className="prof-message-admin">
        <div className='prof-message-heading-admin'>
          <h1><FontAwesomeIcon icon={faNewspaper} /> Professor Messages</h1>
        </div>
      <div className="prof-message-input-container">
        <label>
          Message Heading:
          <input
            type="text"
            value={messageHeading}
            onChange={(e) => setMessageHeading(e.target.value)}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Author Email:
          <input
            type="text"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />
        </label>
        <label>
          Message Description:
          <textarea
            value={messageDescription}
            onChange={(e) => setMessageDescription(e.target.value)}
          />
        </label>
        <label>
          Message Image:
          <input name="profImage" type="file" accept="image/*" onChange={handleMessageChange} />
        </label>
        <button onClick={handleAddMessage}>Add Message</button>
      </div>
      <ToastContainer {...toastOptions} />
    </div>
  );
}

export default ProfMessageAdmin;