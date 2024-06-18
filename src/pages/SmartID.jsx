import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import image4 from '.././assets/i.jpg'
import { useNavigate } from 'react-router-dom';
import {db} from "../firebase.js"
import "react-toastify/dist/ReactToastify.css";
import './SmartID.css' 
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

const SmartID = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [entryNo, setEntryNo] = useState("");
    const [yearOfPassing, setYearOfPassing] = useState("");
    const [phone, setphone] = useState("");
    const [department, setDepartment] = useState("");
    const [hostel, setHostel] = useState("");
    const [course, setCourse] = useState("");
    const [country, setCountry] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [donation, setDonation] = useState("");
    const [duration, setDuration] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    let errorMessage = "";
    const notifySuccess = (message) => {
        toast.success(message, toastOptions);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Validate email format using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(newEmail);
        // const isValid = validator.isEmail(newEmail);
        setIsValidEmail(isValid);
    };

    const navigate = useNavigate(); 
    // const { isAdmin, setIsAdmin } = useContext(StateContext);
    const Slides = [
        // {
        //   url:image1,
        // },
        // {
        //     url:image3,
        // },
        {
            url:image4,
        },
      ];
      
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? Slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setNextIndex(newIndex === 0 ? Slides.length - 1 : newIndex - 1);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === Slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setNextIndex(newIndex === Slides.length - 1 ? 0 : newIndex + 1);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setNextIndex(slideIndex === Slides.length - 1 ? 0 : slideIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  
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

    
    const colRef = collection(db, 'Giving Back In kind');
    console.log(colRef);
    const q = query(colRef, where('email', '==', email));

    // try {
    //   console.log("in giving back in kind try part")
    //   const snapshot = await getDocs(q);
    
    //   if (snapshot.size > 0) {
    //     // Documents satisfying the query exist
    //       errorMessage = "Entered email is already in use. Please log in or use different email id.";
    //       toast.error(errorMessage, toastOptions);
    //       return;
    //   } 
    // } catch (error) {
    //   console.error('Error getting documents:', error);
    // }

    try {
      const data = {
        email: email,
        name: name,
        entryNo: entryNo,
        passingYear: yearOfPassing,
        phone: phone,
        department: department,
        hostel: hostel,
        degree: course,
        country: country,
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
          hostel: hostel,
          degree: course,
          country: country,
          linkedIn: linkedin,
          itemName: donation,
          duration: duration
        });
      }
    } catch {
      errorMessage = "Failed to send mail";
      toast.error(errorMessage, toastOptions);
    }

    setName("");
    setEmail("");
    setEntryNo("");
    setYearOfPassing("");
    setphone("");
    setDepartment("");
    setHostel("");
    setCourse("");
    setCountry("");
    setLinkedin("");
    setDonation("");
    setDuration("");
  }

  return (
    <div className='ml-8 mr-8 mt-4'>
      <div className='h-screen w-full m-auto py-20 px-4 group overflow-hidden'>
        <motion.div
          style={{ backgroundImage: `url(${Slides[currentIndex].url})` }}
          className='absolute top-[100px] left-0 w-full h-full bg-cover bg-center z-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='relative flex flex-col mt-[120px] justify-end items-center'>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className='text-[70px] text-white font-semibold mb-4'
            >
              Connecting Generations of Excellence
            </motion.h1>
            {/* <div className='flex justify-center items-center'>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className='text-[25px]  text-white mb-8 w-full whitespace-nowrap'
              >
                Register now and become a member of Alumni Association of IIT Ropar.
              </motion.p>
            </div> */}
            {/* <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className='bg-transparent border-blue-900 border-[4px] rounded-full text-white text-[27px] font-bold py-2 px-3'
              onClick={() => {
                navigate('/SmartID');
              }}
            >
              Get you Smart ID card now
            </motion.button> */}
          </div>
        </motion.div>
        <div className='flex top-4 justify-center py-2 z-10'>
          {Slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                currentIndex === slideIndex ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              &bull;
            </div>
          ))}
        </div>
      </div>
      <div className='main-container'>
  <div className='container-1'>
    <img src="/images/administration-block-iit-ropar-8176406.webp" alt="Donate Image" />
    <div className='note'>
      <h1>Enjoy Numerous Benefits for You and Your Family!!</h1>
      <ul className="bullet-points">
        <li><p>Career Upliftment-Referral for Hi-end Jobs, India and Abroad</p></li>
        <li><p>Promote Your Alumni Owned Business, StartUp Idea funding, Research Continuing etc</p></li>
        <li><p>Discounted Merchant Programs and Souvenir Shopping</p></li>
        <li><p>Joy of Giving-IITRPR Community</p></li>
        <li><p>Email, Library, Sport, Accommodations etc. at Campus</p></li>
      </ul>
    </div>
  </div>
</div>
<div className='form-container'>
  
<div className='outer_form' >
        <div className='details_form'>
        <div className='text-center'>
    <h2 className='form-heading'>IITRPR ALUMNI I-CARD APPLICATION</h2>
  </div>
      <form>
      <label>
                Please Choose the appropriate Category
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="Amount Payable: Rs 2000 (Standard Price)" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                     Amount Payable: Rs 2000 (Standard Price)
                </label>
        <label>
                Courier Required (Fee: Rs 100)
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="Amount Payable: Rs 2000 (Standard Price)" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                
                     Yes
                     <br />
                     <input 
                  type="checkbox" 
                  name="time" 
                  value="Amount Payable: Rs 2000 (Standard Price)" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                
                     No
                </label>
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
                Your Phone/WhatsApp Numbers:
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
                <select 
                  name="department" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className='text_input'
                >
                  <option value="">Choose</option>
                  <option value="CSE">Computer Science</option>
                  <option value="EE">Electrical</option>
                  <option value="ME">Mechanical</option>
                  <option value="MnC">Mathematics and Computing</option>
                  <option value="CH">Chemical</option>
                  <option value="Civil">Civil</option>
                  <option value="EP">Engineering Physics</option>
                  <option value="Ai">Artifical Intelligence</option>
                  <option value="ME">Metalurgy Engineering</option>
                  <option value="DS">Data Science</option>
                  <option value="bio">Biomedical</option>
                  <option value="Maths">Maths</option>
                  <option value="Phy">Physics</option>
                  <option value="chem">Chemistry</option>
                  <option value="Humanities">Humanities</option>
                </select>
              </label>
              <br />
              <label>
                Your Hostel:
                <br/>
                <select 
                  name="hostel" 
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className='text_input'
                >
                  <option value="">Choose</option>
                  <option value="chenab">Chenab</option>
                  <option value="ravi">Ravi</option>
                  <option value="satluj">Satluj</option>
                  <option value="bhramputra">Bhramputra</option>
                  <option value="beas">Beas</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <br />
              <label>
                Degree or Type of Program(s) Enrolled in at IIT Ropar:
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="undergraduate"
                  onChange={(e) => setCourse(e.target.value)}
                /> 
                  Undergraduate (B.Tech/ B.E./B.Sc.)
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="masters"
                  onChange={(e) => setCourse(e.target.value)} 
                /> 
                  Masters (M.Tech/M.Sc.)
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="phd"
                  onChange={(e) => setCourse(e.target.value)} 
                /> 
                  Ph.D
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="dualDegree"
                  onChange={(e) => setCourse(e.target.value)} 
                /> 
                  Dual Degree (Integrated Program - Undergraduate + Masters)
                <br />
                <input 
                  type="text" 
                  name="others_degree" 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className='text_input' 
                  placeholder='Others' 
                />
              </label>
              <br />
              <label>
                Current Country of Residence:
                <br/>
                <input 
                  type="text" 
                  name="country" 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className='text_input' 
                />
              </label>
              <br />
              
              <div className='flex flex-row justify-center'>
                <button
                  type="submit"
                  className='submit'
                //   onClick={handleSubmit}
                //   disabled={!verified} // Disable button if captcha is not verified
                >
                Submit
              </button>
            </div>
            </form>
      </div>
      </div>

    </div>
    </div>
  );
};

export default SmartID;
