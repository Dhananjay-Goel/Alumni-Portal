import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { saveAs } from 'file-saver';
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from 'firebase/firestore';

const ExcelDownloadComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "Users");
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map(doc => doc.data());

        const adminRef = collection(db, "admin");
        const adminSnapshot = await getDocs(adminRef);
        const adminEmails = adminSnapshot.docs.map(doc => doc.data().email);

        // Filter out users whose emails are not in the admin collection
        const filteredUsers = usersData.filter(user => !adminEmails.includes(user.email));
        
        setData(filteredUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const downloadAsExcel = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'firebase_data.csv');
  };

//   const convertToCSV = (data) => {
//     const header = Object.keys(data[0]).join(',');
//     const csv = data.map(item => Object.values(item).join(',')).join('\n');
//     return header + '\n' + csv;
//   };

  const convertToCSV = (data) => {
    const header = 'Address,Country code,Country,Degree,Department,Duration,Email,EntryNo,Hostel,ItemName,linkedIN,Name,Year of Passing, Phone No,'; // Adjust according to your data fields
    const csv = data.map(item => `${item.name},${item.email},${item.age}`).join('\n');
    return header + '\n' + csv;
  };
  

  return (
    <div className='flex flex-row justify-center mb-2'>
      {/* <h2
        className='text-3xl font-semibold text-white p-4 mb-4 mr-2 py-2 rounded-md shadow-md'
      >
        Data Download
      </h2> */}
      <button 
        onClick={downloadAsExcel}
        className='bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold'
      >
        Download Excel
    </button>
    </div>
  );
};

export default ExcelDownloadComponent;
