import React, { useState } from "react";
import "firebase/firestore";
import { auth, db } from "../firebase.js";
import * as XLSX from "xlsx"; // for parsing Excel files
import firebase from "firebase/app"; // Firebase SDK
import "firebase/firestore"; // Firestore
import {
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState("alumni");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleUpload = () => {
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(jsonData);
        // Now you have jsonData, you can validate it and upload to Firestore
        // Example:
        const collectionName = selectedType === "alumni" ? "Users" : "admin";
        const collectionRef = collection(db, collectionName);

        const headerRow = jsonData[0]; // Get the first row which contains column names

        // Remove the first row (header) from jsonData
        const dataRows = jsonData.slice(1);

        // Extract column names from header row
        const columnNames = headerRow.map((columnName, index) => columnName);
        console.log(columnNames);

        // Iterate over data rows and upload to Firestore
        dataRows.forEach((data) => {
          const dataObject = {};
          data.forEach((value, index) => {
            // Use column names from header row as keys
            dataObject[columnNames[index]] = value;
          });
          addDoc(collectionRef, dataObject)
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });

        // Set uploading to false after all documents are added
        setUploading(false);
        setFile(null);

        // Reload the page
        setTimeout(() => {
          window.location.reload();
        }, 5000); // Reload after 3 seconds
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="community-events-heading animate__animated animate__fadeInUp w-full">
        <h1 className="text-2xl font-bold mb-0 px-10 py-2 text-blue-700">
          <FontAwesomeIcon icon={faDatabase} /> Excel to Database
        </h1>
      </div>

      <div className="flex flex-col mt-4 p-2 mb-2">
        <label htmlFor="type" className="mb-2 text-lg font-semibold">
          Choose Database Collection:
        </label>
        <select
          id="type"
          onChange={handleTypeChange}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="alumni">Alumni</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex flex-col items-center mt-4 p-2 mb-2">
        <label htmlFor="file" className="mb-2 text-lg font-semibold">
          Choose a file:
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="py-2 px-4 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadForm;
