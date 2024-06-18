import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, storage } from '../firebase'; // Import Firestore and Firebase Storage instances
import { collection, getDocs, addDoc, deleteDoc, doc, where, query } from 'firebase/firestore'; // Import Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import storage functions
import { motion } from "framer-motion";
import StateContext from '../StateContext.js'; // Import StateContext for managing user login status


const toastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

const ExecutiveCommittee = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMemberData, setNewMemberData] = useState({
    Name: '',
    Position: '',
    Description: '',
    image: '',
    Title: 'Current', // Default value for Title field
  });
  const [imageFile, setImageFile] = useState(null);
  const isAdmin = localStorage.getItem("isAdmin"); // Get admin status from localStorage


  useEffect(() => {
    // Fetch executive committee members from Firestore
    const fetchCommitteeMembers = async () => {
      const committeeMembersCollection = collection(db, 'Executive Committee');
      const snapshot = await getDocs(committeeMembersCollection);
      const committeeMembersData = snapshot.docs.map(doc => doc.data());
      setCommitteeMembers(committeeMembersData);
    };

    fetchCommitteeMembers();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleAddMember = async () => {
    try {
      if (!newMemberData.Name || !newMemberData.Position ) {
        toast.error('Please fill in all fields', toastOptions);
        return;
      }

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `/executivecommittee/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
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
            // Add image URL to newMemberData
            const newData = { ...newMemberData, image: url };

            // Add a new member to the database
            const docRef = await addDoc(collection(db, 'Executive Committee'), newData);

            // Update the local state to include the new member
            setCommitteeMembers(prevMembers => [...prevMembers, newData]);

            // Reset the form data
            setNewMemberData({
              Name: '',
              Position: '',
              Description: '',
              image: '',
              Title: 'Current', // Reset Title field to default value
            });

            // Hide the form
            setShowForm(false);

            // Show success toast
            toast.success('New member added successfully!', toastOptions);
          } catch (error) {
            console.log("Error getting download URL or saving data:", error);
            toast.error('Failed to add new member!', toastOptions);
          }
        }
      );
    } catch (error) {
      // Show error toast if adding member fails
      toast.error('Failed to add new member!', toastOptions);
      console.error('Error adding document: ', error);
    }
  };
  
  const handleDeleteMember = async (name) => {
    try {
        const colRef = collection(db, "Executive Committee");
        // console.log(colRef);
        console.log(name);
        const q = query(colRef, where("Name", "==", name));
        const snapshot = await getDocs(q);
        console.log(snapshot);
        if (snapshot.size > 0) {
            const doc = snapshot.docs[0];
            await deleteDoc(doc.ref);
            // Reload the page
            // window.location.reload();
        } else {
            console.error("No document found with id:", name);
        }
      // Delete member's data from Firestore
    //   await deleteDoc(doc(db, 'Executive Committee', id));
  
      // Update the local state to remove the deleted member
     
      // Show success toast
      toast.success(`Member deleted successfully!`, toastOptions);
      setTimeout(() => {
        window.location.reload();
    }, 1000); // Reload after 3 seconds
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Failed to delete member!', toastOptions);
    }
  };
  
  
  
  
  // Sort committeeMembers based on Title
  const sortedMembers = committeeMembers.sort((a, b) => {
    const order = ['Director', 'Dean IR & AA', 'President', 'Vice President'];
    const aIndex = order.indexOf(a.Position);
    const bIndex = order.indexOf(b.Position);
    return aIndex - bIndex;
  });
  
  const closeModal = () => {
    setShowForm(false);
    setNewMemberData({
      Name: '',
      Position: '',
      Description: '',
      image: '',
      Title: 'Current',
    });
  };

  
  
  return (
    <div>
      <div className='flex flex-col items-center justify-center bg-slate-200 w-full h-[120px] gap-2'>
        <p className='text-black font-bold font-serif text-[36px]'>Executive Committee</p>
      </div>

      <div className="mx-auto max-w-screen-lg">
        {/* Section for 'Current' members */}
        <div className='mb-8'>
          <h2 className="text-4xl font-bold text-center mt-8 mb-8 px-4">Current</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {sortedMembers.filter(member => member.Title === 'Current').map((member, index) => (
              <div key={index} className="bg-white rounded-md shadow-md overflow-hidden">
                {isAdmin === 'true' && (
                <button onClick={() => handleDeleteMember(member.Name)} className="ml-[200px] text-red-500 hover:text-red-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            )}
                 

                <img
                  className="rounded-full h-32 w-32 mx-auto mt-4"
                  src={member.image}
                  alt={member.name}
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-center mb-2">{member.Name}</h3>
                  <p className="text-base font-semibold text-center mb-2">{member.Position}</p>
                  <p className="text-base text-center">{member.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section for 'Ex-Officio' members */}
        <div className='mb-8'>
          <h2 className="text-4xl font-bold text-center mt-8 mb-8 px-4">Ex-Officio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {sortedMembers.filter(member => member.Title === 'Ex-Officio').map((member, index) => (
              <div key={index} className="bg-white rounded-md shadow-md overflow-hidden">
                  {isAdmin === 'true' && (
                <button onClick={() => handleDeleteMember(member.Name)} className="ml-[200px] text-red-500 hover:text-red-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            )}

                <img
                  className="rounded-full h-32 w-32 mx-auto mt-4"
                  src={member.image}
                  alt={member.name}
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-center mb-2">{member.Name}</h3>
                  <p className="text-base font-semibold text-center mb-2">{member.Position}</p>
                  <p className="text-base text-center">{member.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section for 'Council Members' */}
        <div className='mb-8'>
          <h2 className="text-4xl font-bold text-center mt-8 mb-8 px-4">Council Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {sortedMembers.filter(member => member.Title === 'Council Members').map((member, index) => (
              <div key={index} className="bg-white rounded-md shadow-md overflow-hidden">

            {isAdmin === 'true' && (
                <button onClick={() => handleDeleteMember(member.Name)} className="ml-[200px] text-red-500 hover:text-red-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            )}



                <img
                  className="rounded-full h-32 w-32 mx-auto mt-4"
                  src={member.image}
                  alt={member.name}
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-center mb-2">{member.Name}</h3>
                  <p className="text-base font-semibold text-center mb-2">{member.Position}</p>
                  <p className="text-base text-center">{member.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section for 'Batch Evangelists' */}
        <div className='mb-8'>
          <h2 className="text-4xl font-bold text-center mt-8 mb-8 px-4">Batch Evangelists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {sortedMembers.filter(member => member.Title === 'Batch Evangelists').map((member, index) => (
              <div key={index} className="bg-white rounded-md shadow-md overflow-hidden">
            {isAdmin === 'true' && (
                <button onClick={() => handleDeleteMember(member.Name)} className="ml-[200px] text-red-500 hover:text-red-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            )}

                <img
                  className="rounded-full h-32 w-32 mx-auto mt-4"
                  src={member.image}
                  alt={member.name}
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-center mb-2">{member.Name}</h3>
                  <p className="text-base font-semibold text-center mb-2">{member.Position}</p>
                  <p className="text-base text-center">{member.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isAdmin === 'true' && (
        <button onClick={() => setShowForm(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto mb-4">
          Add New Member
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <select
                value={newMemberData.Title}
                onChange={e => setNewMemberData({ ...newMemberData, Title: e.target.value })}
                className="w-full border rounded-md px-3 py-2 mb-3"
              >
                <option value="Current">Current</option>
                <option value="Ex-Officio">Ex-Officio</option>
                <option value="Council Members">Council Members</option>
                <option value="Batch Evangelists">Batch Evangelists</option>
              </select>
            <input
              type="text"
              placeholder="Name"
              value={newMemberData.Name}
              onChange={e => setNewMemberData({ ...newMemberData, Name: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mb-3"
            />
            <input
              type="text"
              placeholder="Position"
              value={newMemberData.Position}
              onChange={e => setNewMemberData({ ...newMemberData, Position: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mb-3"
            />
            <textarea
              placeholder="Description"
              value={newMemberData.Description}
              onChange={e => setNewMemberData({ ...newMemberData, Description: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mb-3"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-md px-3 py-2 mb-3"
            />
            <button onClick={handleAddMember} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mx-auto mb-4">
              Add Member
            </button>
          </div>
        </div>
      )}

      <ToastContainer {...toastOptions} />
    </div>
  );
};

export default ExecutiveCommittee;
