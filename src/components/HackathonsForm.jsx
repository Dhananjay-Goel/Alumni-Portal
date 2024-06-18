import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { BsChatDots, BsBriefcase, BsLightbulb } from "react-icons/bs";
import { addDoc, getDoc, getDocs, collection, doc, updateDoc, query, where } from "firebase/firestore";
import {auth, db} from "../firebase.js"

const HackathonsForm = () => {
    const [topic, setTopic] = useState('');
    const [type, setType] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const userId = localStorage.getItem("userId")

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission

        if(topic === ""){
            errorMessage  = "Please provide your topic.";
            toast.error(errorMessage, toastOptions);
            return;
        }
    
        if(type === ""){
            errorMessage = "Type is required.";
            toast.error(errorMessage, toastOptions);
            return;
        }

        if(date === ""){
            errorMessage  = "Please provide date.";
            toast.error(errorMessage, toastOptions);
            return;
        }

        if(duration === ""){
            errorMessage  = "Please provide duration.";
            toast.error(errorMessage, toastOptions);
            return;
        }

        try {
            // Fetch user document from Firestore
            const colRef = collection(db, 'Users');
            const q = query(colRef, where('uid', '==', userId));
            const snapshot = await getDocs(q);
    
            // Check if user document exists
            if (snapshot.empty) {
                errorMessage = "User not found.";
                toast.error(errorMessage, toastOptions);
                return;
            }
    
            // Extract user data from document
            snapshot.forEach(async(doc) => {
                const userData = doc.data();
                const { name, email, phone } = userData;
                await setEmail(email);
                await setName(name);
                await setPhone(phone);
    
                // Do something with the user data (e.g., display it, store it, etc.)
                console.log('User Name:', name);
                console.log('User Email:', email);
                console.log('User Phone:', phone);

                // Now that the state has been updated, you can proceed with the API call
                const data = {
                    email: email, 
                    name: name,
                    phone: phone,
                    topic: topic,
                    type: type,
                    date: date,
                    duration: duration,
                    additionalInfo: additionalInfo
                };

                const response = await fetch(`${process.env.REACT_APP_API_URL}/email/events/hackathons`, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                console.log(response.status);

                if(response.status !== 200) {
                    errorMessage = "Failed to send mail.";
                    toast.error(errorMessage, toastOptions);
                    return;
                } 

                const docRef = await addDoc(collection(db, "Workshops"), {
                    uid: userId,
                    email: email, 
                    name: name,
                    phone: phone,
                    topic: topic,
                    type: type,
                    date: date,
                    duration: duration,
                    additionalInfo: additionalInfo
                });

                notifySuccess("Mail sent successfully to admin!")
                console.log('Form submitted:', { topic, type, date, duration });

            });

        } catch(error) {
            errorMessage = "Error submitting form!";
            toast.error(errorMessage, toastOptions);
        }

        // Reload the page
        setTimeout(() => {
            window.location.reload();
        }, 5000); // Reload after 3 seconds
    };

  return (
    <div className='flex flex-row gap-6 w-'>
            <div className='w-1/2 p-4'>
                <h1 className="text-4xl font-bold mb-4 transition-opacity duration-300 opacity-100 mt-4">
                    <span className="text-blue-500 text-center mr-4">Hackathons</span><BsBriefcase className="inline-block mr-2" size={24} />
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="topic" className="block text-left">Topic of Hackathon<span className="text-red-500">*</span> :</label>
                        <input
                            type="text"
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="type" className="block text-left">Type of Hackathon<span className="text-red-500">*</span> :</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="Contest">Contest</option>
                            <option value="Case Study">Case Study</option>
                            <option value="Others">Others</option>
                            {/* Add more options as needed */}
                            {/* {type === 'Others' && (
                                <div className="mt-4">
                                    <label htmlFor="otherType" className="block text-left">Specify Other Type<span className="text-red-500">*</span> :</label>
                                    <input
                                        type="text"
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                                        required
                                    />
                                </div>
                            )} */}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="date" className="block text-left">Start Date of Hackathon:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="duration" className="block text-left">Duration (days):</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="additionalInfo" className="block text-left">Additional Information:</label>
                        <textarea
                            id="additionalInfo"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-1/2 p-4'>
                <img src='/images/hackathon.jpg' alt="Workshop" className="w-full h-full object-cover"/>
            </div>
            <ToastContainer />
        </div>
  )
}

export default HackathonsForm