import React from 'react'
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';
import { RiRefund2Line } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { TiNews } from "react-icons/ti";
import { MdEventAvailable } from "react-icons/md";
import { GiStarMedal } from "react-icons/gi";
import { MdOutlineApproval } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { FcPlanner } from "react-icons/fc";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import DataList from './DataList';
import { useNavigate } from 'react-router-dom';
import { FaTable } from 'react-icons/fa';

const chartSetting = {
  yAxis: [
    {
      label: 'Registrations in Last 24 Months',
    },
  ],
  width: 800,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    NewMembers: 200,
    TotalMembers: 1270,
    month: 'Jan',
  },
  {
    NewMembers: 370,
    TotalMembers: 1294,
    month: 'Fev',
  },
  {
    NewMembers: 150,
    TotalMembers: 1200,
    month: 'Mar',
  },
  {
    NewMembers: 2873,
    TotalMembers: 1430,
    month: 'Apr',
  },
  {
    NewMembers: 900,
    TotalMembers: 1520,
    month: 'May',
  },
  {
    NewMembers: 1800,
    TotalMembers: 1610,
    month: 'June',
  },
  {
    NewMembers: 1206,
    TotalMembers: 1610,
    month: 'July',
  },
  {
    NewMembers: 730,
    TotalMembers: 1690,
    month: 'Aug',
  },
  {
    NewMembers: 510,
    TotalMembers: 1990,
    month: 'Sept',
  },
  {
    NewMembers: 580,
    TotalMembers: 2500,
    month: 'Oct',
  },
  {
    NewMembers: 324,
    TotalMembers: 1690,
    month: 'Nov',
  },
  {
    NewMembers: 167,
    TotalMembers: 1390,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}`;
const HomeProfile = () => {
  const navigate = useNavigate();
  const [startCounting, setStartCounting] = useState(false);
  useEffect(() => {

    const timer = setTimeout(() => {
      setStartCounting(true);

    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(timer); // Cleanup function
  }, []);


  const [selectedOption, setSelectedOption] = useState('Home');

  return (
    <div >
      {selectedOption === 'Home' && (
        <>

          <div className='flex flex-row gap-[50px] mt-[50px] ml-[45px]'>
            <p className="text-[20px] border-4 border-indigo-900 shadow-xl text-gray-600 w-[150px]  h-[100px] flex flex-col items-center justify-center bg-slate-200 rounded-xl gap-2 ml-[25px] font-medium">
              {startCounting && (
                <CountUp start={0} end={1356} duration={1.5} />
              )}
              Life Members
            </p>
            <p className="text-[20px] border-4 border-indigo-900 shadow-xl text-gray-600 w-[200px]  h-[100px] flex flex-col items-center justify-center bg-slate-200 rounded-xl gap-2 ml-[25px] font-medium">
              {startCounting && (
                <CountUp start={0} end={2176} duration={1.5} />
              )}
              Registered on Portal
            </p>
            <p className="text-[20px] border-4 border-indigo-900 shadow-xl text-gray-600 w-[210px]  h-[100px] flex flex-col items-center justify-center bg-slate-200 rounded-xl gap-2 ml-[25px] font-medium">
              {startCounting && (
                <CountUp start={0} end={566} duration={1.5} />
              )}
              Total active members
            </p>
            <p className="text-[20px] border-4 border-indigo-900 shadow-xl text-gray-600 w-[210px]  h-[100px] flex flex-col items-center justify-center bg-slate-200 rounded-xl gap-2 ml-[25px] font-medium">
              {startCounting && (
                <CountUp start={0} end={156} duration={1.5} />
              )}
              Pending Appprovals
            </p>
            <p className="text-[20px] border-4 border-indigo-900 shadow-xl text-gray-600 w-[240px]  h-[130px] flex flex-col items-center justify-center bg-slate-200 rounded-xl gap-2 ml-[25px] font-medium mt-[-18px]">
              <p className='text-gray-800'>Registrations</p>
              <div className='flex flex-row gap-3 '>
                <p className='flex flex-col gap-2'><p className='ml-[30px]'>11</p> <p className='text-[15px]'>this month</p></p>
                <p className='text-[15px] mt-2'>VS</p>
                <p className='flex flex-col gap-2'><p className='ml-[25px]'>25</p><p className='text-[15px]'>last month</p></p>
              </div>

            </p>
          </div>

          <div className='flex flex-row items-center justify-center'>
            <div className='w-[480px]  flex flex-col ml-[50px] mt-[30px] mb-6'>
              <div className='flex flex-row text-[50px] items-center justify-between ml-[40px] mr-[40px] '>
              <div className='text-[#C40C0C] text-[50px] w-[70px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Talks')} style={{ cursor: 'pointer' }}>
                <ImUsers />
                  <p className='text-gray-800 text-[18px]'>Talks</p>
                </div>

                <div className='text-[#C40C0C] text-[50px] w-[70px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Workshops')} style={{ cursor: 'pointer' }}>
                  <TiNews />
                  <p className='text-gray-800 text-[18px]'>Workshops</p>
                </div>
                <div className='text-[#FFDB5C] text-[50px] flex flex-col items-center justify-center' onClick={() => navigate('/upload')} style={{ cursor: 'pointer' }}>
                  <FaTable />
                      <p className='text-gray-800 text-[18px]'> Export Excel</p>
                </div>


              </div>

              <div className='flex flex-row text-[50px] items-center justify-between ml-[3px] mr-[40px] mt-5'>
                <div className='text-[#0E46A3] w-[130px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Internships')} style={{ cursor: 'pointer' }} >

                  <GiStarMedal />
                  <p className='text-gray-800 text-[18px]'>Job Application</p>
                </div>

                <div className='text-[#C40C0C] text-[50px] w-[70px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Admin')} style={{ cursor: 'pointer' }}>
                  <MdAdminPanelSettings />
                  <p className='text-gray-800 text-[18px]'>Admin</p>
                </div>
                <div className='text-[#5AB2FF] w-[70px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Alumni')} style={{ cursor: 'pointer' }}>
                  <PiStudentFill />
                  <p className='text-gray-800 text-[18px]'>Alumni</p>
                </div>

              </div>

              <div className='flex flex-row text-[50px] items-center justify-between ml-[3px] mr-[40px] mt-5'>
                <div className='text-[#FF70AB] w-[140px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Give Back in Kind')} style={{ cursor: 'pointer' }}>
                  <FaHandHoldingHeart />
                  <p className='text-gray-800 text-[18px]'>Give Back in Kind</p>
                </div>
                <div className='text-[#FFDB5C] w-[70px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Past Reunions')} style={{ cursor: 'pointer' }}>
                  <FaPeopleGroup />
                  <p className='text-gray-800 text-[18px]'>Past Reunion</p>
                </div>
                <div className='text-[#FFDB5C] w-[70px] h-[100px] flex flex-col items-center justify-center ' onClick={() => setSelectedOption('Planned Reunions')} style={{ cursor: 'pointer' }}>
                  <FcPlanner />
                  <p className='text-gray-800 text-[18px]'>Planned Reunion</p>
                </div>
              </div>
            </div>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
              series={[
                { dataKey: 'NewMembers', label: 'New Members', valueFormatter },
                { dataKey: 'TotalMembers', label: 'Total Members', valueFormatter },
                // { dataKey: 'newYork', label: 'New York', valueFormatter },
                // { dataKey: 'seoul', label: 'Seoul', valueFormatter },
              ]}
              {...chartSetting}
            />
          </div>
        </>
      )}
      {selectedOption === 'Alumni' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Alumni'} />
      )}
      {selectedOption === 'Admin' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Admin'} />
      )}
      {selectedOption === 'Give Back in Kind' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Give Back in Kind'} />
      )}
      {selectedOption === 'Past Reunions' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Past Reunions'} />
      )}
      {selectedOption === 'Planned Reunions' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Planned Reunions'} />
      )}
      {selectedOption === 'Internships' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Internships'} />
      )}
      {selectedOption === 'Talks' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Talks'} />
      )}
      {selectedOption === 'Workshops' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Workshops'} />
      )}
      {selectedOption === 'Startup Presentations' && (
        // Render your DataList component with 'Alumni' parameter
        <DataList selectedOption={'Startup Presentations'} />
      )}
    </div>
  )
}

export default HomeProfile 

