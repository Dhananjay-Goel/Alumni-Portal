import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { BsChatDots, BsBriefcase, BsLightbulb } from "react-icons/bs";
import { addDoc, getDoc, getDocs, collection, doc, updateDoc, query, where } from "firebase/firestore";
import {auth, db} from "../firebase.js"

const MentorshipProgramForm = () => {
    
    const [domain, setDomain] = useState('');
    const [eligibility, setEligibility] = useState('');
    const [content, setContent] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
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

        if(domain === ""){
            errorMessage  = "Please provide your domain.";
            toast.error(errorMessage, toastOptions);
            return;
        }
    
        if(eligibility === ""){
            errorMessage = "eligibility is required.";
            toast.error(errorMessage, toastOptions);
            return;
        }

        if(content === ""){
            errorMessage  = "Please provide your content.";
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
                    domain: domain,
                    eligibility: eligibility,
                    content: content,
                    date: date,
                    duration: duration,
                    additionalInfo: additionalInfo
                };

                const response = await fetch(`${process.env.REACT_APP_API_URL}/email/events/mentorshipPrograms`, {
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

                const docRef = await addDoc(collection(db, "Mentorship Programs"), {
                    uid: userId,
                    email: email, 
                    name: name,
                    phone: phone,
                    domain: domain,
                    eligibility: eligibility,
                    content: content,
                    date: date,
                    duration: duration,
                    additionalInfo: additionalInfo
                });

                notifySuccess("Mail sent successfully to admin!")
                console.log('Form submitted:', { domain, eligibility, content, date, duration });

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
                    <span className="text-blue-500 text-center mr-4">Mentorship Programs</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="domain" className="block text-left">Domain<span className="text-red-500">*</span> :</label>
                        <input
                            type="text"
                            id="domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="eligibility" className="block text-left">Eligibility<span className="text-red-500">*</span> :</label>
                        <input
                            id="type"
                            value={eligibility}
                            onChange={(e) => setEligibility(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="content" className="block text-left">Content Covered<span className="text-red-500">*</span> :</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="date" className="block text-left">Tentative Start Date:</label>
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
                <img src='/images/mentorship.jpg' alt="Workshop" className="w-full h-full object-cover"/>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MentorshipProgramForm