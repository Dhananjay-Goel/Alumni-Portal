import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { saveAs } from 'file-saver';
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from 'firebase/firestore';

import jsPDF from 'jspdf';
import 'jspdf-autotable';


const PdfKindDownloadComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "Giving Back In kind");
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

  const downloadAsPdf = () => {
    const doc = new jsPDF();
    const tableData = data.map(item => [item.name, item.email, item.phone, item.passingYear, item.itemName, item.duration]); // Modify this based on your data structure
    
    doc.text("Alumni Data", 10, 10);
    doc.autoTable({
      head: [['Name', 'Email', 'Phone', 'Year of Passing', 'Item to be Donated', 'Time to be Taken to donate']], // Table header
      body: tableData, // Table data
    });

    doc.save("kind_firebase_data.pdf");
  };

  return (
    <div className='flex flex-row justify-center mt-5'>
      {/* <h2>Data Download</h2> */}
      <button 
        onClick={downloadAsPdf}
        className='bg-blue-900 mb-4 text-white px-6 py-3 rounded-lg text-lg font-semibold'
      >
          Download PDF
      </button>
    </div>
  );
};

export default PdfKindDownloadComponent;
