import React,{useState} from 'react'
import image2 from '../assets/fund3.jpg'
import { MdShare } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
const FinancialAidProgram = () => {
    const [isSharingOpen, setIsSharingOpen] = useState(false);

    const toggleSharing = () => {
      setIsSharingOpen(!isSharingOpen);
    };
      return (
        <div className='flex flex-col items-center justify-center gap-8 bg-gray-200'>
            <div className='w-[1100px] h-[390px] flex flex-col shadow-lg rounded-b-xl bg-white'>
                <img src={`${image2}`} className='w-[1100px] h-[300px] object-cover rounded-b-xl'/>
                <div className='flex flex-row items-center justify-between mt-3 p-2'>
                    <p className='font-bold text-indigo-900 text-[30px] ml-5'>Scholarships/Student Programs</p>
                    <div className='bg-indigo-900 mr-5 text-white rounded-3xl w-[150px] h-[50px] flex items-center justify-center cursor-pointer text-[20px]'>Donate (USD)</div>
                </div>
            </div>
    
            <div className='flex flex-row w-[1100px] h-[1000px]  gap-[25px] mb-8'>
            <div className='w-[730px] h-[950px] flex flex-col shadow-lg rounded-xl  bg-white'>
              <p className='text-gray-800 px-8 pt-8 text-[20px]'>"No admitted student be denied an IIT education due to a lack of funds."</p>
              <p className='text-gray-600 px-8 pt-8 '>Student scholarships are a critical and ongoing need at IIT Ropar. The current tuition fees for the academic year (2024) stand at Rs. 2.5 lakhs per year, with costs for a year of study, including mess bills, totaling approximately Rs. 2.8 lakhs (excluding hostel fees and books). With the growing number of students enrolling at IIT Ropar, there is an increasing demand to provide financial assistance to a larger proportion of students.
<p>
Presently, nearly 50% of undergraduate students come from economically disadvantaged backgrounds, with many having an annual family income of less than Rs. 1 lakh. Despite this, a significant number of deserving students still lack the necessary financial support to pursue their education at IIT Ropar.
</p>
<p>
It is our shared goal to ensure that no admitted student is deprived of an IIT education due to financial constraints. Your support in providing scholarships can make a significant difference in the lives of these students. By contributing to student scholarships at IIT Ropar, you empower deserving individuals to access quality education and unlock their full potential.</p></p>
              <p className='text-gray-600 px-8 pt-4 '>To donate using your Credit Card or PayPal, please click the <span className='text-gray-700 font-bold'>Donate</span>  button above. You can select which program to give how much to in that window.</p>
              <p className='text-gray-600 px-8 pt-4 '>You can also <span  className='transition-colors duration-300 hover:text-blue-400 cursor-pointer text-indigo-500'>donate in INR or other non-USD currencies.</span></p>
              <div className='px-8 pt-6'>
              <div className='w-[650px] h-[270px] bg-[#E3FEF7]'>
                 <p className='font-semibold text-[20px] text-gray-500 p-3 ml-2'>Student Scholarships</p>
                 <p className='font-normal text-gray-500  ml-2 p-3'>These are primarily merit-cum-means scholarships funded by US alumni and administered by IIT. Scholarships are outright grants with no obligation on the part of the recipient to return any monies. 
<p className='mt-3'>
You can donate any amount - the smallest amount to add to a pool from which HF consolidates and creates individual scholarships, to multi-year, named scholarships!</p></p>
                 
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

export default FinancialAidProgram
