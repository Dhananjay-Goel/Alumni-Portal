import React from 'react'
import logo from "./../assets/logo.png"
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <>
   
    <footer className='w-full bg-blue-900 p-8'>
    <div className='flex flex-row justify-between'>
    
    <div className='flex flex-col text-white ml-20 '>
    <div className=' text-[30px] mr-5 '><ion-icon name="location-outline"></ion-icon>Address</div>
    <ul className='flex flex-col text-gray-300 ml-5 hover:text-white'>
    <li>Bara Phool, Ropar</li>
    <li> Punjab 140001, India</li>
    </ul>
    </div>

    <div>
    <div className="border-2 rounded-xl">
      <iframe
        width="500"
        height="300"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=500&amp;height=400&amp;hl=en&amp;q=Bara%20Phool%20,%20Ropar%20,%20Punjab,%20India+(Indian%20Institute%20of%20Technology%20Ropar)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        allowFullScreen
        className='rounded-xl'
      >
      </iframe>
    </div>
    </div>
   
    <div className='text-gray-300 flex flex-col'>
        <div className='text-white text-[30px] mr-7'> <ion-icon name="link-outline"></ion-icon> Useful Links</div>
        <ul className=' flex flex-col py-3 gap-2 ml-3' >
            <li className='hover:text-white '><Link to="/News">News and Updates</Link></li>
            <li className='hover:text-white'><Link to="/Donate">Donate</Link></li>
            <li className='hover:text-white'><Link to="/BecomeAMember">Become a member</Link></li>
            <li className='hover:text-white'><Link to="/givingback">Give Back</Link></li>
            <li className='hover:text-white'><Link to="/fund">Fundraising</Link></li>
            <li className='hover:text-white'><Link to="/Jobs">Intern & Full-time Opportunities</Link></li>
        </ul>
    </div>

    <div className=' flex flex-col text-white text-[30px] mr-20'> 
        Contact Us
        <div className='text-[20px]'>
            
            <div className='flex flex-row ml-2'>
                <div className='flex  flex-row items-center gap-2 justify-start ml-1'>
                <ion-icon name="mail-outline"></ion-icon>Email -
                </div> 
                <div className='ml-1'>alumni@iitrpr.ac.in</div>
               
            </div>
        </div> 
        <div className='ml-4 text-[50px] flex flex-row gap-5 '>
                   <a href="https://www.facebook.com/iitrpr"><ion-icon name="logo-facebook" ></ion-icon></a>
                   <a href="https://twitter.com/iitrpr"><ion-icon name="logo-twitter"></ion-icon></a>
                   {/* <a href="https://twitter.com/iitrpr"><ion-icon name="logo-instagram"></ion-icon></a> */}
        </div>
    
    </div>
    </div>
    <hr className="border-t border-gray-300 my-7" />
    <div className='   flex items-center justify-center text-white font-medium'>Copyright © 2021| Alumni Association of IIT Ropar. All Rights Reserved.</div>
  </footer>
  
    </>
  )
}

export default Footer
