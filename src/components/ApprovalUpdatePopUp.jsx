import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth, db } from "../firebase.js";
import {
  doc,
  updateDoc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ApprovalUpdatePopUp = ({ userId, newApprovalStatus, handleClose }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  let errorMessage = "";
  const notifySuccess = (message) => {
    toast.success(message, toastOptions);
  };

  const handleApprovalChange = async (userId, newApprovalStatus) => {
    try {
      // Update user's approval status in Firebase
      // const userRef = doc(collection(db, "Users"), userId);
      // await updateDoc(userRef, { approved: newApprovalStatus });
      console.log(userId);
      const colRef = collection(db, "Users");
      console.log(colRef);
      const q = query(colRef, where("uid", "==", userId));
      const snapshot = await getDocs(q);
      console.log(snapshot);
      const docRef = doc(db, "Users", snapshot.docs[0].id);
      console.log(docRef);
      await updateDoc(docRef, { approved: newApprovalStatus });

      notifySuccess("Alumni Approved!");
      // Close the modal
      handleClose();
      // Show success message
      //   alert("User approval status updated successfully!");
    } catch (error) {
      console.error("Error updating user approval status:", error);
      //   alert("Failed to update user approval status. Please try again later.");
      toast.error(
        "Failed to update Alumni approval status. Please try again later.",
        toastOptions
      );
    }
  };

  const handleUpdateApproval = async () => {
    await handleApprovalChange(userId, newApprovalStatus);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* Your icon */}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Update Approval Status
                </h3>
                {/* Your input fields */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleUpdateApproval}
              className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update Approval
            </button>
            <button
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApprovalUpdatePopUp;
