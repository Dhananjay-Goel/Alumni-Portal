import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from 'firebase/firestore';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PlannedReunionsListDownload = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from Firebase Firestore
        const fetchData = async () => {
          try {
            const usersRef = collection(db, "plannedReunions");
            const usersSnapshot = await getDocs(usersRef);
            const usersData = usersSnapshot.docs.map(doc => doc.data());
            
            setData(usersData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const downloadAsPdf = () => {
        const doc = new jsPDF();
        const tableData = data.map(item => [item.batch, item.date, item.title, item.description]); // Modify this based on your data structure
        
        doc.text("Planned Reunions Data", 10, 10);
        doc.autoTable({
          head: [['Batch', 'Date', 'Title', 'Description']], // Table header
          body: tableData, // Table data
        });
    
        doc.save("planned_reunions_firebase_data.pdf");
      };

    return (
        <div className='flex flex-row justify-center mt-5'>
            <button 
                onClick={downloadAsPdf}
                className='bg-blue-900 mb-4 text-white px-6 py-3 rounded-lg text-lg font-semibold'
            >
                Download PDF
            </button>
        </div>
    )
}

export default PlannedReunionsListDownload