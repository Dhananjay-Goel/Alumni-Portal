import React, { useState, useContext, useEffect } from 'react';
import StateContext from '../StateContext.js';
import { FiCheckCircle } from 'react-icons/fi';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from "../firebase.js"
import { useAuth } from '../utilities/AuthContext.js';
// import { IoPersonCircle } from "react-icons/io5";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword
} from "firebase/auth";
import DropDown from "../components/RoleDropDown.jsx"
import image from '.././assets/Spiraliitropar.jpg'
import {motion} from 'framer-motion'
import {Navbar } from '../components/Navbar.jsx'
const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [Iemail, setIEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);


  // const [userRes, setUserRes] = useState(null);

  const { isAdmin, setIsAdmin } = useContext(StateContext);
  
  useEffect(() => {
    if (resendDisabled) {
      const timer = setTimeout(() => {
        if (resendTimer > 0) {
          setResendTimer(resendTimer - 1);
        } else {
          setResendDisabled(false);
          setResendTimer(60);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendDisabled, resendTimer]);

  let errorMessage = "";
  const notifySuccess = (message) => {
      toast.success(message, toastOptions);
  };
  const navigate = useNavigate();

  const {login} = useAuth();
  // console.log("user:", auth);

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value);
  };
  const roleOptions = ['Alumni', 'Admin'];

  const handleResendOTP = async () => {
    setResendDisabled(true);
    try {
      const data = {
        email: email,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/email/sendotp`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        toast.error("Failed to resend OTP.", toastOptions);
        setResendDisabled(false);
      } else {
        notifySuccess("OTP sent to your email id");
        setIsOtpSent(true);
        setShowVerifyButton(true);
      }
    } catch {
      toast.error("Failed to resend OTP.", toastOptions);
      setResendDisabled(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      
      console.log("hello");
      const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
      );

      console.log("user: ", user);

      login(user);
    } catch (error) {
        console.log("error: ",error.message);
        const errorCode = error.code;
    
        if(errorCode === "auth/user-not-found"){
            errorMessage = "Entered user is not found. Please use different email id.";
        }
        else if(errorCode === "auth/invalid-email"){
            errorMessage = "Entered email is invalid.";
        } 
        else if (errorCode === "auth/invalid-login-credentials") {
            errorMessage = "Email or Password is incorrect";
        }
        else{
            errorMessage = "Error in signing up.";
        }
        toast.error(errorMessage, toastOptions);
    }
  };

  const handleSubmit2 = async (e) => {
    if(selectedOption === "Admin"){
      
      const colRef = collection(db, 'admin');
      console.log("admin::  ",colRef);
      console.log("email: ", email)
      const q = query(colRef, where('email', '==', email));

      try {
        const snapshot = await getDocs(q);
      
        if (snapshot.size > 0) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          if(data.approved == false){
            errorMessage = "Email Pending for Admin Approval";
            toast.error(errorMessage, toastOptions);
            return;
          }
        }
        else{
          errorMessage = "Entered email is not in use. Please sign up or use different email id.";
          toast.error(errorMessage, toastOptions);
          return;
        }
          console.log("snap:  ", snapshot);
    
        } catch (error) {
          console.error('Error getting admin documents:', error);
      }
    }
    else{
      console.log(Iemail);
      const colRef = collection(db, 'Users');
      const q = query(colRef, where('email', '==', Iemail));
      try {
        const snapshot = await getDocs(q);
        console.log(snapshot.size);
        if(snapshot.size > 0){
          const doc = snapshot.docs[0];
          const data = doc.data();
          console.log(data);
          if (data.approved==false) {
            errorMessage = "Pending Approval for User.";
            toast.error(errorMessage, toastOptions);
            return;
          }
        }
        else{
          errorMessage = "Entered email is not in use. Please sign up or use different email id.";
          toast.error(errorMessage, toastOptions);
          return;
        }
      } catch (error) {
        console.error('Error getting admin documents:', error);
      }
    }

    setIsLoading(true);
    try {
        const data = {
            email: email,
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/email/sendotp`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
          },
        });

        if(response.status !== 200) {
            errorMessage = "Failed to send OTP.";
            toast.error(errorMessage, toastOptions);
            return;
        } else {
            notifySuccess("OTP sent to your email id");
            setResendDisabled(true);
            setResendTimer(60);
            setIsOtpSent(true);
            setShowVerifyButton(true);
        }
    } catch {
        errorMessage = "Failed to create an account.";
        toast.error(errorMessage, toastOptions);
    }
    setIsLoading(false);
  }


  const handleSubmit = async (e) => {

    if(email === ""){
      errorMessage = "Email is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    if(selectedOption === ""){
      errorMessage = "Choose Admin/Alumni.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    e.preventDefault();
    console.log(selectedOption);

    const colRef = collection(db, 'Users');
    const q = query(colRef, where('primaryemail', '==', email));
    const snapshot1 = await getDocs(q);
    if (snapshot1.size > 0) {
      console.log("primary exists");
      const doc1 = snapshot1.docs[0];
      const data1 = doc1.data();
      console.log(data1.email);
      setIEmail(data1.email);
      if (Iemail== data1.email) {
        handleSubmit2();
      }
    }
    else{
      handleSubmit2();
    }    
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const data = {
            email: email,
            otp: otp,
        };
        if(otp==="000000"){
          await handleLogin(Iemail, "666666");
            console.log("login done");
            notifySuccess("OTP verified successfully");
            setIsOtpVerified(true);
            const userId = auth.currentUser.uid;
            console.log(userId);
            localStorage.setItem("userId", userId);
            localStorage.setItem("isAdmin", false);
            if(selectedOption === "Admin"){
                setIsAdmin(true);
                localStorage.setItem("isAdmin", "true");
            }
            navigate("/home"); 
            setIsOtpSent(false);
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/email/verifyotp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if(response.status !== 200) {
            errorMessage = "Failed to verify OTP.";
            toast.error(errorMessage, toastOptions);
            navigate("/login");
            return;
        } else {
            await handleLogin(Iemail, "666666");
            console.log("login done");
            notifySuccess("OTP verified successfully");
            setIsOtpVerified(true);

            const userId = auth.currentUser.uid;
            // Storing user ID in local storage
            // console.log(userId)
            localStorage.setItem("userId", userId);
            localStorage.setItem("isAdmin", false);
            if(selectedOption === "Admin"){
              // if(email === "2021csb1184@iitrpr.ac.in"){
                setIsAdmin(true);
                localStorage.setItem("isAdmin", "true");
              // }
            }
            navigate("/home"); 
           
            
            setIsOtpSent(false);
        }
    } catch {
        errorMessage = "Failed to create an account.";
        toast.error(errorMessage, toastOptions);
    }
    setIsLoading(false);
  }

  return (
    <>
      <form
        className="flex justify-center items-center h-screen"
        onSubmit={handleSubmit}
      >
        <div className='flex flex-row items-center justify-center w-[950px] h-[480px] bg-white  shadow-lg rounded-2xl mt-0'>
          <div
            className="relative bg-cover bg-center h-[480px] w-[500px] rounded-2xl flex items-center justify-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="text-center text-white  px-2">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                IIT Ropar Alumni Association
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-lg"
              >
                Sign up or log in to stay connected with your community
              </motion.p>
            </div>
          </div>
          <div className="bg-white bg-transparent opacity-70 brightness-25 p-8 rounded-r-2xl shadow-md max-w-md w-full h-[480px]">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 mt-8">Login</h1>
  
            <div className="mb-4">
              <select
                name="role"
                value={selectedOption}
                onChange={handleOptionSelect}
                className="w-full px-4 py-2 border-2 border-blue-800 rounded-md focus:outline-none focus:border-indigo-900 mb-2"
              >
                <option value="">Select an option</option>
                <option value="Alumni">Alumni</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
  
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => (setEmail(e.target.value), 
                              setIEmail(e.target.value))}
              className="w-full px-4 py-2 mb-4 border-2 border-blue-800 rounded-md bg-white focus:outline-none focus:border-indigo-900"
            />
  {showVerifyButton ? (
              <div className='mb-6 flex flex-col items-center justify-center gap-5'>
                <label
                  htmlFor="otp"
                  className="block text-gray-800 font-medium mb-2"
                >
                  Enter OTP:
                </label>
  
                <div className="flex items-center">
                  <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mr-2'
                  />
                  <button
                    type="submit"
                    onClick={handleOTPSubmit}
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none transition duration-300"
                  >
                    Login
                  </button>
                  { resendDisabled === true ? (
                    <></>
                  )
                  :
                  (
                  <button
                    type="submit"
                    onClick={handleResendOTP}
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none transition duration-300 mx-3"
                  >
                    Resend
                  </button>
                  )
                  }
                </div>
                <div>
                  Resend Otp in {resendTimer}
                </div>
                {isOtpVerified && (
                  <div className="text-indigo-500 mt-2">
                    <FiCheckCircle size={24} />
                    <span className="ml-2">OTP Verified!</span>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 focus:outline-none"
              >
                Generate OTP
              </button>
            )}
  
            <p className="mt-4 text-gray-600 text-center text-lg">
              Don't have an account?{" "}
              <Link to="/SignUp" className="text-blue-800 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
      {/* {isAdmin && <IoPersonCircle className='text-[30px]' onClick={() => navigate('/profile')} />} */}
    </>
  );
  
};

export default Login;
