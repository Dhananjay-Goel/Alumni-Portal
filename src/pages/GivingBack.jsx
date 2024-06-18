import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './GivingBack.css';
import {db} from "../firebase.js"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import Captcha from '../components/captcha';

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const GivingBack = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [entryNo, setEntryNo] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");
  const [phone, setphone] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [donation, setDonation] = useState("");
  const [duration, setDuration] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false); // State to track captcha verification
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const colRef = collection(db, 'Users');
        const q = query(colRef, where('uid', '==', userId));
        const snapshot = await getDocs(q);
        setName(snapshot.docs[0].data().name);
        setEmail(snapshot.docs[0].data().email);
        setEntryNo(snapshot.docs[0].data().entryNo);
        setYearOfPassing(snapshot.docs[0].data().passingYear);
        setphone(snapshot.docs[0].data().phone);
        setDepartment(snapshot.docs[0].data().department);
        setLinkedin(snapshot.docs[0].data().linkedin);
        setCourse(snapshot.docs[0].data().degree)
        console.log(email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);


  let errorMessage = "";
  const notifySuccess = (message) => {
      toast.success(message, toastOptions);
  };
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(newEmail);
    // const isValid = validator.isEmail(newEmail);
    setIsValidEmail(isValid);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(email === ""){
      errorMessage = "Email is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    
    if(name === ""){
      errorMessage = "UserName is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(entryNo === ""){
      errorMessage = "Entry Number is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(yearOfPassing === ""){
      errorMessage = "Year of Passing is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(phone === ""){
      errorMessage = "Phone No. is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(donation === ""){
      errorMessage = "Gifts or Grants field is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(duration === ""){
      errorMessage = "Time taken to donate is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if (!verified) {
      errorMessage = "Please verify the captcha.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    
    const colRef = collection(db, 'Giving Back In kind');
    console.log(colRef);
    const q = query(colRef, where('email', '==', email));
    console.log(email);

    setIsLoading(true);
    try {
      const data = {
        email: email,
        name: name,
        entryNo: entryNo,
        passingYear: yearOfPassing,
        phone: phone,
        department: department,
        degree: course,
        linkedIn: linkedin,
        itemName: donation,
        duration: duration
      };

      console.log("calling api")
      const response = await fetch(`${process.env.REACT_APP_API_URL}/email/givingBackInKind`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)

      if(response.status !== 200) {
        errorMessage = "Failed to send giving back in kind mail";
        toast.error(errorMessage, toastOptions);
        return;
      } else {
        notifySuccess("giving back in kind mail sent to alumni cell id");
        const docRef = await addDoc(collection(db, "Giving Back In kind"), {
          email: email,
          name: name,
          entryNo: entryNo,
          passingYear: yearOfPassing,
          phone: phone,
          department: department,
          degree: course,
          linkedIn: linkedin,
          itemName: donation,
          duration: duration
        });
      }
    } catch {
      errorMessage = "Failed to send mail";
      // toast.error(errorMessage, toastOptions);
    }

    setName("");
    setEmail("");
    setEntryNo("");
    setYearOfPassing("");
    setphone("");
    setDepartment("");
    setCourse("");
    setLinkedin("");
    setDonation("");
    setDuration("");
    setIsLoading(false);
  }

  return (
    <div>
      <div className='Giving-back-heading'>
        <h1> <FontAwesomeIcon icon={faHandHoldingUsd } /> Give Back In Kind</h1>
      </div>
      <div className='main-cont-1'>
        <div className='G_container-1'>
          <img src="/images/i4.webp" alt="Giving Back" />
          <div className='Text_box'>
            <h1>Give Back In Kind - Volunteering Form</h1>
            <p> Dear IIT Ropar Alumnus,
                <br/>Alumni have always been the intrinsic strength at IIT Ropar and a have played an active role in driving a number of high impact initiatives for the Institute. The institute recognizes and immensely values your passion and commitment towards the betterment of the Institute & Students.
                <br/>As a proud alumni, you can also make an immense contribution towards the future & vision of your alma mater by your Volunteering Efforts where you can support by means of your time, expertise, passion, valuable experience & by other means which are non-monetary.
                <br/>This form is designed to collect your interest to Volunteer for Give Back in Kind to IIT Ropar. Our team will share your interest and match it with the right opportunity for you to make an impact through your contributions, as they transpire.
            </p>
          </div>
        </div>
      </div>
      <div className='outer_form' >
        <div className='details_form'>
      <form>
              <label>
                Full Name:
                <br/>
                <input 
                  type="text" 
                  name="name" 
                  value={name}
                  className='text_input'
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Email ID:
                <br/>
                <input 
                  type="email"
                  value = {email} 
                  name="email" 
                  className='text_input'
                  onChange={handleEmailChange} 
                />
                {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
              </label>
              <br />
              <label>
                Entry Number :
                <br/>
                <input 
                  type="text" 
                  name="entryNo" 
                  value={entryNo}
                  className='text_input'
                  onChange={(e) => setEntryNo(e.target.value)}
                />
              </label>
              <br />
              <label>
                Year of Passing:
                <br/>
                <input 
                  type="text" 
                  name="yearOfPassing" 
                  value={yearOfPassing}
                  className='text_input'
                  onChange={(e) => setYearOfPassing(e.target.value)}
                />
              </label>
              <br />
              <label>
                Your Phone/WhatsApp Number:
                <br/>
                <input 
                  type="tel" 
                  name="phone"
                  value={phone} 
                  className='text_input'
                  onChange={(e) => setphone(e.target.value)}
                />
              </label>
              <br />
              <label>
                Your Department at IIT Ropar:
                <br/>
                <input  
                  name="department" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className='text_input'
                />
              </label>
              <br />
              <label>
                Degree or Type of Program(s) Enrolled in at IIT Ropar:
                <br/>
                <input  
                  name="degree" 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className='text_input'
                />
              </label>
              <br />
              <label>
                Your Linkedin Profile URL:
                <br/>
                <input 
                  type="text" 
                  name="linkedin" 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className='text_input' 
                />
              </label>
              <br />
              <label>
                Giving back to the Institute/ Staff Or Faculty in 'Kind' with Gifts & Grants:
                <br />
                <input 
                  type="text" 
                  name="donation"
                  value={donation}
                  onChange={(e) => setDonation(e.target.value)} 
                  className='text_input' 
                />
              </label>
              <br />
              <label>
                If a suitable 'Giving Back in Kind' opportunity comes up, how much time would you need to donate?
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="30-60 Days" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                 &nbsp;30-60 Days
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="15-30 Days"
                  onChange={(e) => setDuration(e.target.value)} 
                /> 
                  &nbsp;15-30 Days
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="7-15 Days" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                  &nbsp;7-15 Days
                <br />
                <input 
                  type="checkbox"   
                  name="time" 
                  value="Within a Week" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                  &nbsp;Within a Week
              </label>
              <br />
              <div className="mb-4">
                <Captcha setVerified={setVerified} /> {/* Pass setVerified as prop */}
              </div>
              <div className='flex flex-row justify-center'>
                <button
                  type="submit"
                  className='submit'
                  onClick={handleSubmit}
                  disabled={!verified} // Disable button if captcha is not verified
                >
                Submit
              </button>
            </div>
              {/* <button 
                type="submit" 
                
                
              >
                Submit
              </button> */}
            </form>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GivingBack;
