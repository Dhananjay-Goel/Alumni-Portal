import React, {useState,useEffect} from 'react'
import logo from "./../assets/logo.png"
import {Link} from "react-router-dom"
import NavLinks from "./NavLinks"
import { useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../utilities/AuthContext.js'

const Navbar = ({loggin}) => {
  // const {logout} = useAuth();
  const[open , setOpen] = React.useState(false)
  const[toggle,setToggle] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLoggedIn();
  });

  const checkLoggedIn = () => {
    setIsLoggedIn(localStorage.getItem("userId") !== null);
  };


  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // await logout();
      // Removing user ID from local storage
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      navigate("/login");
      // Additional logout actions if needed
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
   <nav className='text-black font-normal'>
     <div className='flex items-center font-medium justify-around'>
        <div className='flex flex-row items-center z-50 p-5 md:w-auto w-full '>
          <div className='flex  items-center'>
            <img src={logo}alt="" className='md:cursor-pointer bg-white h-12 w-13 mr-3 p-1 rounded-full'/>
            <div className='flex flex-col '>
              <span className="font-bold text-2xl">Alumni Relations</span> <span className='hover:text-blue-500'>Indian Institute of Technology Ropar</span>
            </div>
          </div>
        </div>
        <div className='text-3xl md:hidden cursor-pointer' onClick={()=> setOpen(!open)}>
          <ion-icon name={`${open ?'close' : 'menu'}`}></ion-icon>
        </div>
        
        {/* Desktop View */}

       <ul className=' md:flex hidden  items-center gap-8 text-black-300 '>
        <NavLinks/>
        <>
          {isLoggedIn ? (
            <>
              <IoPersonCircle 
                className='text-[30px]'
                onClick={() => {
                  navigate('/profile');
                }}
              />
              <FaSignOutAlt 
              className='text-[30px]'
              onClick={handleLogout}
              />
            </>
          ) : (
            // < className='w-[150px] h-9 rounded-lg flex flex-row border-2 border-blue-700 items-center justify-center'>
              <div
                className={` w-[80px] h-10 ml-1 flex items-center text-[21px] justify-center rounded-lg cursor-pointer bg-blue-500 text-white`}
                onClick={() => {
                  setToggle(!toggle);
                  navigate('/login');
                }}
              >
                Login
              </div>

              
          )}
        </>        
       </ul>

       {/* Mobile View */}
       <ul className = {`md:hidden bg-white absolute w-full h-full bottom-0 py-24  pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
       
        <NavLinks/>
       </ul>

     </div>
     <div className='w-full h-2 bg-blue-800'></div>
     {/* <hr className="border-t border-blue-700 my-0.5" /> */}
   </nav>
  )
}

export default Navbar
