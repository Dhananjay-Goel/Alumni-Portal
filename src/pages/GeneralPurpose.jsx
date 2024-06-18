import React , {useState} from 'react'
import image1 from '../assets/fund4.jpg'
import { MdShare } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const GeneralPurpose = () => {
    const [isSharingOpen, setIsSharingOpen] = useState(false);

    const toggleSharing = () => {
      setIsSharingOpen(!isSharingOpen);
    };
      return (
        <div className='flex flex-col items-center justify-center gap-8 bg-gray-200'>
            <div className='w-[1100px] h-[390px] flex flex-col shadow-lg rounded-b-xl bg-white'>
                <img src={`${image1}`} className='w-[1100px] h-[300px] object-cover rounded-b-xl'/>
                <div className='flex flex-row items-center justify-between mt-3 p-2'>
                    <p className='font-bold text-indigo-900 text-[30px] ml-5'>Unrestricted and Greatest Need</p>
                    <div className='bg-indigo-900 mr-5 text-white rounded-3xl w-[150px] h-[50px] flex items-center justify-center cursor-pointer text-[20px]'>Donate (USD)</div>
                </div>
            </div>
    
            <div className='flex flex-row w-[1100px] h-[800px]  gap-[25px] mb-8'>
            <div className='w-[730px] h-[700px] flex flex-col shadow-lg rounded-xl  bg-white'>
              <p className='text-gray-600 px-8 pt-8'>Support the Unrestricted General Purpose Fund and the Greatest Need at IIT Ropar by making a donation today. Your contribution will strengthen the foundation of alumni support and enhance the institute's financial effectiveness.</p>
              <p className='text-gray-600 px-8 pt-4 '>To donate using your Credit Card or PayPal, please click the <span className='text-gray-700 font-bold'>Donate</span>  button above. You can select which program to give how much to in that window.</p>
              <p className='text-gray-600 px-8 pt-4 '>You can also <span  className='transition-colors duration-300 hover:text-blue-400 cursor-pointer text-indigo-500'>donate in INR or other non-USD currencies.</span></p>
              <div className='px-8 pt-6'>
              <div className='w-[650px] h-[320px] bg-[#E3FEF7]'>
                 <p className='font-semibold text-[20px] text-gray-500 p-3 ml-2'>Unrestricted General Purpose Fund</p>
                 <p className='font-normal text-gray-500  ml-2 p-3'>The Unrestricted General Purpose Fund at IIT Ropar is a vital resource that supports various aspects of the institute's operations and initiatives. Donations to this fund provide flexibility in addressing the most pressing needs and opportunities that arise, ensuring that IIT Ropar can continue to deliver a high-quality education and research environment. Contributions to this fund help enhance academic programs, support faculty development, improve infrastructure, and provide scholarships and financial aid to deserving students. By donating to the Unrestricted General Purpose Fund, you can make a meaningful impact on the overall growth and excellence of IIT Ropar.</p>
                 
              </div>
              </div>
              <div className='p-8 ml-[250px]'>
              <div className='bg-indigo-900 text-white rounded-3xl w-[150px] h-[50px] flex items-center justify-center cursor-pointer text-[20px]'>Donate (USD)</div>
              </div>
            </div>
    
            <div className='w-[300px] h-[230px] flex flex-col shadow-lg rounded-xl  ml-10 bg-white' >
               <p className='font-semibold text-[20px] mt-5 ml-4 '>Sharing is caring!</p>
               <p className='text-gray-600 font-normal ml-4 mt-3'>Spreading the word around helps us reach more people that inch us closer to reaching our goals.</p>
               <div className='ml-4 mt-5 '>
                 <div className='relative'>
                <div
                    className='w-[120px] h-[50px] bg-gray-400 cursor-pointer text-[18px] flex flex-row items-center justify-center gap-2 rounded-2xl'
                    onClick={toggleSharing}
                >
                    <MdShare />
                    <p>Share</p>
                </div>
                <div
                    className={`absolute top-[60px] left-0 w-[120px] bg-gray-300  rounded-lg transition-all duration-300 ${
                    isSharingOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ maxHeight: isSharingOpen ? '200px' : '0px' }}
                >
                    <div className='flex flex-col'>
                    <button className='p-2 hover:bg-gray-200 flex flex-row gap-2'> <AiFillFacebook className='mt-1'/> Facebook</button>
                    <button className='p-2 hover:bg-gray-200 flex flex-row gap-2'><FaTwitter className='mt-1' />Twitter</button>
                    <button className='p-2 hover:bg-gray-200 flex flex-row gap-2'><FaSquareInstagram className='mt-1' />Instagram</button>
                    <button className='p-2 hover:bg-gray-200 flex flex-row gap-2'><IoLogoWhatsapp className='mt-1' />Whatsapp</button>
                    </div>
                </div>
                </div>
               </div>
            </div>
            </div>
          
        </div>
      )
}

export default GeneralPurpose
