import React, { useEffect, useState } from 'react';
import './AlumniCard.css'; // Import CSS file for styling
import { db, auth } from "../firebase.js"; // Import the db and auth objects from your Firebase configuration
import { collection, getDocs, where, query } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faHandshake } from '@fortawesome/free-solid-svg-icons'; // Import faHandshake icon
import logo from '.././assets/logo3.png'; // Import logo image
import { useNavigate  } from 'react-router-dom';

const AlumniCard = () => {
  const [alumniData, setAlumniData] = useState(null); // Change state initialization to null
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate(); 

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const colRef = collection(db, 'Users');
        const q = query(colRef, where('uid', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.size > 0) {
          snapshot.forEach((doc) => {
            const userData = doc.data();
            const alumni = {
              name: userData.name,
              degree: userData.degree,
              entryno: userData.entryNo,
              department: userData.department,
              passingYear: userData.passingYear,
              mobileNumber: userData.phone, // Assuming 'phone' is the field for the mobile number
              profileURL: userData.profileURL, // Assuming 'profileURL' is the field for the profile photo URL
            };
            setAlumniData(alumni);
          });
        } else {
          console.log('No documents found for the given query.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if(isLoggedIn){
      fetchUserData();
    }
  }, []);

  return (
    <>
    <div className='community-events-heading'>
        <h1> <FontAwesomeIcon icon={faHandshake} /> Alumni Membership Card</h1>
    </div>
    <div className={`alumni-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {isFlipped==0 ? 
            <div className="alumni-card-front">
        
            <div className="alumni-id-header">
              <div className="alumni-id-logo">
                <img src={logo} alt="College Logo" />
              </div>
            </div>
            <div className="alumni-content">
              <div className="alumni-profile-photo">
                {alumniData && <img src={alumniData.profileURL} alt="Profile" />} {/* Render the profile photo */}
              </div>
              <div className="alumni-info">
                <div>
                  <pre>Entry No         :   {alumniData && alumniData.entryno}</pre>
                </div>
                <div>
                  <pre>Name               :   {alumniData && alumniData.name}</pre>
                </div>
                <div>
                  <pre>Department    :   {alumniData && alumniData.department}</pre>
                </div>
                <div>
                  <pre>Program          :   {alumniData && alumniData.degree}</pre>
                </div>
                <div>
                  <pre>Passing Year   :   {alumniData && alumniData.passingYear}</pre>
                </div>
              </div>
            </div>
            <div className='alumni-footer'> ALUMNI </div>
          </div>
      : 
      <div className='alumni-card-back'>
        <div className="alumni-id-header">
              <div className="alumni-id-logo">
                <img src={logo} alt="College Logo" />
              </div>
            </div>
            <div className="alumni-content">
              <div className="alumni-info">
                <div>
                  <pre> Mobile Number  : {alumniData && alumniData.mobileNumber}</pre>
                </div>
                <div>
                  <pre> Address                : Indian Institute of Technology Ropar </pre>
                  <pre>                                  Rupnagar, Punjab - 140001 </pre>
                </div>
                <div className='back-side-2'>
                  <pre> Instructions:  1.  Member is responsible for all transactions from this card.  </pre>
                  <pre>                           2. It is compulsory to carry this card in Institute.</pre>

                </div>

              </div>
            </div>
            <div className='alumni-footer'> ALUMNI </div>
      </div>
      }
    </div>
    <div className="p-2 flex justify-center">
        <button
            className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold"
            onClick={() => navigate("/Profile")} // Wrap navigate function call in an arrow function
        >
            Profile
        </button>
    </div>
    </> 
  );
};

export default AlumniCard;
