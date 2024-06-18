import React , {useState} from 'react'
import { MdShare } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import image4 from '../assets/fund9.jpg'
const LegacyProjects = () => {
    const [isSharingOpen, setIsSharingOpen] = useState(false);

    const toggleSharing = () => {
      setIsSharingOpen(!isSharingOpen);
    };
      return (
        <div className='flex flex-col items-center justify-center gap-8 bg-gray-200'>
            <div className='w-[1100px] h-[390px] flex flex-col shadow-lg rounded-b-xl bg-white'>
                <img src={`${image4}`} className='w-[1100px] h-[300px] object-cover rounded-b-xl'/>
                <div className='flex flex-row items-center justify-between mt-3 p-2'>
                    <p className='font-bold text-indigo-900 text-[30px] ml-5'>
                    Undergraduate Labs</p>
                    <div className='bg-indigo-900 mr-5 text-white rounded-3xl w-[150px] h-[50px] flex items-center justify-center cursor-pointer text-[20px]'>Donate (USD)</div>
                </div>
            </div>
    
            <div className='flex flex-row w-[1100px] h-[800px]  gap-[25px] mb-8'>
            <div className='w-[730px] h-[700px] flex flex-col shadow-lg rounded-xl  bg-white'>
              <p className='text-gray-600 px-8 pt-8'>The number of undergraduate students joining IIT Ropar is increasing every year. As a result, we need your support to help us further enhance the laboratories on campus. We are highlighting this cause under our fundraising campaign ‘GO IIT Ropar’ for 2021. The funds will be used to provide new and upgraded technology for the labs as well as maintain lab space and equipment.

Laboratories represent the critical academic infrastructure of IIT Ropar and form an important part of the Institute’s identity as a world-class research Institute. Your generosity will not only further IIT Ropar’s mission to achieve excellence at every step of the way but also encourage students to conduct cutting-edge, high-impact research and contribute to the field of science.

Practical application of theoretical concepts that students learn in classrooms are an important facet of any engineering discipline. Only when students observe, manipulate and handle real materials can they truly grasp the magnitude of science. Practical application of scientific concepts promotes experiential learning thus enabling students to understand and remember the concepts beyond conventional means of learning such as through textbooks and classroom lectures. Laboratories give young minds a chance to bring their ideas and imagination to life. As an institution that aspires to be a global leader in engineering education and research, IIT Ropar fully recognizes the power of practical learning and hence aims to provide state-of-the-art facilities to its students for them to master their subjects holistically.</p>
              <p className='text-gray-600 px-8 pt-4 '>To donate using your Credit Card or PayPal, please click the <span className='text-gray-700 font-bold'>Donate</span>  button above. You can select which program to give how much to in that window.</p>
              <p className='text-gray-600 px-8 pt-4 '>You can also <span  className='transition-colors duration-300 hover:text-blue-400 cursor-pointer text-indigo-500'>donate in INR or other non-USD currencies.</span></p>
              
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

export default LegacyProjects
