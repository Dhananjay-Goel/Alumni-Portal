import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { LuIndianRupee } from 'react-icons/lu';
import { FaCircleCheck } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import {motion} from 'framer-motion';
import list from "./list1.json";
const AccordionRecurring = () => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [selectDiv, setSelectDiv] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleDivClick = (index) => {
    setSelectedDiv(index);
  };

  const handleClick = (index) => {
    setSelectDiv(index);
  };

  return (
    <>
    <div className='flex flex-row items-center justify-between'>
      {/* <motion.div className='flex flex-col'>
          <motion.div className='w-[1000px] pt-[10px] ml-8 mr-8 mb-8'> */}
           <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='flex flex-col'
  >
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='w-[1000px] pt-[10px] ml-8 mr-8 mb-8'
    >
            <div className=' py-[28px] px-[30px] flex flex-row justify-between items-center cursor-pointer'>
              <p className='text-[26px] font-semibold w-[200px]'> Make A Difference Every Month </p>
              <p className={`text-[18px] w-[500px] h-[70px] font-normal text-gray-800 mt-5`} >Your monthly donations will help secure the future of a deserving student and attract the best faculty to the institute </p>
              <div className='text-[30px]'>
                {open ? <AiOutlineMinus onClick={() => setOpen(!open)} /> : <AiOutlinePlus onClick={() => setOpen(!open)} />}
              </div>
            </div>

            <Collapse isOpened={open}>
              <div className={`px-[30px] pb-[20px]  ${open ? 'visible' : 'hidden'}`}>

                <div>
                  <p className='font-bold text-[25px] '>Monthly Recurring Amount</p>
                  <div className='mt-3 flex flex-row items-center justify-between gap-6'>
                    <div
                      className={`w-[150px] h-[50px] mt-1 border border-gray-500 flex flex-row items-center justify-center gap-2 text-[25px] cursor-pointer ${selectedDiv === 0 ? 'bg-blue-900 text-white' : 'bg-white text-black'}`}
                      onClick={() => handleDivClick(0)}
                    >
                      <LuIndianRupee />
                      <div>2000</div>
                      {selectedDiv === 0 && <FaCircleCheck className='flex items-end' />}
                    </div>
                    <div
                      className={`w-[150px] h-[50px] mt-1 border border-gray-500 flex flex-row items-center justify-center gap-2 text-[25px] cursor-pointer ${selectedDiv === 1 ? 'bg-blue-900 text-white' : 'bg-white text-black'}`}
                      onClick={() => handleDivClick(1)}
                    >
                      <LuIndianRupee />
                      <div>7000</div>
                      {selectedDiv === 1 && <FaCircleCheck className='flex items-end' />}
                    </div>
                    <div
                      className={`w-[150px] h-[50px] mt-1 border border-gray-500 flex flex-row items-center justify-center gap-2 text-[25px] cursor-pointer ${selectedDiv === 2 ? 'bg-blue-900 text-white' : 'bg-white text-black'}`}
                      onClick={() => handleDivClick(2)}
                    >
                      <LuIndianRupee />
                      <div>20000</div>
                      {selectedDiv === 2 && <FaCircleCheck className='flex items-end' />}
                    </div>
                    <input type="text" className="w-[300px] h-[50px]  border border-gray-500 " placeholder='Any other amount' />
                  </div>
                </div>

                <div>
                  <p className='font-bold text-[25px] mt-10'>Select Your Cause</p>

                  <div className=' mt-3 flex flex-row items-center justify-between gap-6'>
                    <div className={`h-[50px] w-[200px] flex items-center justify-center border border-gray-500 cursor-pointer text-[25px] gap-2 ${selectDiv === 0 ? 'bg-blue-900 text-white' : 'bg-white text-black'}`} onClick={() => handleClick(0)}>Scholarship {selectDiv === 0 && <FaCircleCheck className='flex items-end' />}</div>
                    <div className={`h-[50px] w-[300px]  flex items-center justify-center border cursor-pointer border-gray-500 text-[25px] ${selectDiv === 1 ? 'bg-blue-900 text-white' : 'bg-white text-black'}`} onClick={() => handleClick(1)}>Your Faculty Award {selectDiv === 1 && <FaCircleCheck className='flex items-end' />}</div>
                    <div className={`h-[50px] w-[300px]   flex items-center justify-center border cursor-pointer border-gray-500 text-[25px] ${selectDiv === 2 ? 'bg-blue-900 text-white' : 'bg-white text-black'}`} onClick={() => handleClick(2)}>Institute Development {selectDiv === 2 && <FaCircleCheck className='flex items-end' />}</div>
                  </div>
                </div>

                <div className="flex flex-row items-start justify-start gap-[70px] mt-7 ">
                  <div className='flex flex-col gap-2 mt-2'>
                    <p className='font-bold text-[25px]'>Start Date</p>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start Date"
                      className=" w-[200px] h-[50px]  border border-gray-700 "
                      showPopperArrow={true}
                    />
                  </div>
                  <div className='flex flex-col gap-2 mt-2'>
                    <p className='font-bold text-[25px]'>End Date</p>
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="End Date"
                      className="w-[200px] h-[50px] border border-gray-700 "
                      showPopperArrow={true}
                    />
                  </div>
                </div>

                <div className='flex items-center justify-center bg-blue-900 text-white text-[27px] w-[210px] h-[60px] mt-8 cursor-pointer font-bold mb-3'>CONFIRM</div>
              </div>
            </Collapse>

            <div className='w-[970px] h-[2px] bg-gray-500 ml-5 mt-5'></div>
          </motion.div>

          <div className='w-[1000px] pt-[10px] ml-8 mr-8 mb-8'>
            <div className=' py-[28px] px-[30px] flex flex-row justify-between items-center cursor-pointer'>
              <p className='text-[26px] font-semibold w-[200px]'>Name Your Hostel Room </p>
              <p className={`text-[18px] w-[500px] h-[70px] font-normal text-gray-800 mt-5`} >You now have an opportunity to name your hostel room and create your legacy! </p>
              <div className='text-[30px]' onClick={() => setSecondOpen(!secondOpen)}>
                {secondOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>

            <Collapse isOpened={secondOpen}>
              <div className={`px-[30px] pb-[20px]  ${secondOpen ? 'visible' : 'hidden'}`}>
                <div className='flex flex-row gap-[100px]'>
                  <div className='flex flex-col gap-4 mt-0.2 '>
                    <p className='text-[25px] font-semibold text-gray-400'>Monthly Donation Amount</p>
                    <div className='w-[320px] h-[50px] border border-gray-400 bg-gray-200 flex flex-row items-center justify-center gap-4 text-[25px]  '> <LuIndianRupee /> {'20' + ',' + '000'}</div>
                  </div>
                  <div className='flex flex-col gap-4 '>
                    <p className='text-[25px] font-semibold text-gray-400'>Cause</p>
                    <div className='w-[320px] h-[50px] border border-gray-400 bg-gray-200 flex flex-row items-center justify-center gap-4 text-[25px]'> Name Your Hostel Room</div>
                  </div>
                </div>

                <div className='flex flex-row mt-5 items-center justify-between '>
                  <div className='flex flex-col gap-3'>
                    <p className='text-[25px] font-semibold text-gray-400 '>Tenure</p>
                    <div className='w-[320px] h-[50px] border border-gray-400 bg-gray-200 flex flex-row items-center justify-center gap-4 text-[25px]'>3 Years</div>
                  </div>

                  <div className='flex flex-row gap-[70px] mt-4'>
                    <div className={`flex flex-col gap-2 ${ !thirdOpen ? "ml-[-20px] mr-[131px]": " ml[-10px] mr-[314px]"}`}>
                      <p className={` text-[25px] text-gray-400 font-semibold `}>Hostel Number </p>
                    
                      <div
                        onClick={() => setThirdOpen(!thirdOpen)}
                        className={`bg-white border border-gray-500 text-[25px] w-[200px] h-[50px] flex items-center justify-between ${
                          !selected && "text-gray-700 "
                        } `}
                      >
                        <div className="flex items-center">
                          {selected
                            ? selected?.length > 25
                              ? selected?.substring(0, 25) + "..."
                              : selected
                            : " "}
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center">
                          {thirdOpen ? (
                            <BiChevronUp size={20} />
                          ) : (
                            <BiChevronDown size={20} />
                          )}
                        </div>
                      </div>
                    
                      


                    </div>

                  
                    <ul
                      className={`bg-white mt-[100px] overflow-y-auto ${
                        thirdOpen ? "m-h-60 border border-gray-300 w-72 absolute z-10" : "max-h-0"
                      } `}
                    >
      
      
                        {list?.map((country) => (
                          <li
                            key={country?.name}
                            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                            ${
                              country?.name?.toLowerCase() === selected?.toLowerCase() &&
                              "bg-sky-600 text-white"
                            }
                            ${
                              country?.name?.toLowerCase().startsWith(inputValue)
                                ? "block"
                                : "hidden"
                            }`}
                            onClick={() => {
                              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                                setSelected(country?.name);
                                setThirdOpen(false); // Use setThirdOpen instead of setOpen
                                setInputValue("");
                              }
                            }}
                          >
                            {country?.name}
                          </li>
                        ))}
                    </ul>

                  </div>

                    
                </div>

                <div className='flex flex-col gap-2 mt-5'>
                  <p className='text-[25px] font-semibold text-gray-400'>Room No.</p>
                  <div
                    contentEditable
                    className='w-[200px] h-[46px] text-gray-700 text-[20px] font-normal flex items-center justify-center border border-gray-400 p-2 outline-none'
                    onClick={(e) => e.target.focus()}
                  />
                </div>

                <div className='font-bold text-[22px] flex items-center justify-center w-[200px] h-[50px] bg-blue-900 text-white mt-7'>CONFIRM</div>
              </div>
              
            </Collapse>

            <div className='w-[970px] h-[2px] bg-gray-500 ml-5 mt-5'></div>
          </div>
      </motion.div>

      {/* <div className='w-[500px] h-[560px] bg-cyan-50 mt-[30px] mr-[50px] border border-gray-400 sticky top-[30px]'> */}
      <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className='w-[500px] h-[560px] bg-cyan-50 mt-[30px] mr-[50px] border border-gray-400 sticky  top-[30px] '
  >
        <div className='ml-7 mr-1'>
            <p className='w-[400px] text-[25px] text-gray-500 font-semibold mt-3  '>Impact of your Recurring Giving for 1 year</p>
            <div className='flex flex-row items-center justify-between'>
              <p className='text-[17px] mt-5'> Amount/month</p>
              <p className='text-[17px] mt-5 mr-7'> Student Scholarship</p>
              <p className='text-[17px] mt-5 mr-10'>YFA</p>
            </div>
            <div className='flex flex-row  gap-[70px]'>
              <p className='text-[17px] mt-5'>1. ₹ 2000</p>
              <p className='text-[17px] mt-5 w-[150px] h-[50px] '>Full Mess-Fee for a Semester</p>
            </div>
            <div className='bg-gray-200 w-[380px] h-0.5 mt-5'></div>
            <div className='flex flex-row  gap-[50px]'>
              <p className='text-[17px] mt-5'>2. ₹10,000</p>
              <p className='text-[17px] mt-5 w-[150px] h-[80px]  '>Full Tuition Fee + Boarding cost for a semester</p>
              <p className='text-[17px] mt-5 w-[70px]   '>Sponsor YFA Award for one year</p>
            </div>
            <div className='bg-gray-200 w-[380px] h-0.5 mt-5'></div>
            <div className='flex flex-row  gap-[50px]'>
              <p className='text-[17px] mt-5'>3. ₹20,000</p>
              <p className='text-[17px] mt-5 w-[150px] h-[80px]  '>Full Tuition Fee + Boarding cost for 1 year</p>
              <p className='text-[17px] mt-5 w-[70px]   '>Sponsor YFA Award for two years</p>
            </div>
        </div>
      

      </motion.div>
      </div>
    </>
  );
};

export default AccordionRecurring;
