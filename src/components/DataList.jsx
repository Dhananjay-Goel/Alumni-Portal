import React, { useState } from 'react';
import GivingBackInKindListComponent from './GivingBackInKindList';
import UserListComponent from './UserListComponent';
import PlannedReunionsList from './PlannedReunionsList';
import PastReunionsList from './PastReunionsList';
import SidebarProfile from "./SidebarProfile";
import AdminList from "./AdminList";
import TalksListComponent from './TalksList';
import WorkshopsListComponent from './Workshops';
import StartupPresentationsListComponent from './StartupPresentations';
import HackathonsListComponent from './Hackathons';
import CommunityServiceProjectsListComponent from './CommunityServiceProjects';
import MentorshipProgramsListComponent from './MentorshipPrograms';
import JobsListComponent from './JobLists';
import * as XLSX from 'xlsx';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import UploadForm from './UploadForm';
import HomeProfile from './HomeProfile';

const DataList = ({ selectedOption, setSelectedOption }) => {
    // const [selectedOption, setSelectedOption] = useState('Home');

    // Fetch data functions
    const fetchDataForAlumni = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return filterAlumniData(data);
    };

    const fetchDataForAdmin = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "admin"));
        querySnapshot.forEach((doc) => {
            data.push({...doc.data() });
        });
        return filterAdminData(data);
    };

    const fetchDataForGiveBack = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Giving Back In kind"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return filterGiveBackData(data);
    };

    const fetchDataForPastReunions = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "pastReunions"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return filterPastReunionsData(data);
    };

    const fetchDataForPlannedReunions = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "plannedReunions"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return filterDataForTalks(data);
    };

    const fetchDataForTalks = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Talks"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    const fetchDataForWorkshops = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Workshops"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    const fetchDataForStartupPresentations = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Startup Presentations"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    const fetchDataForHackathons = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Tech Talks and Hackathons"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    const fetchDataForCommunityServiceProjects = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Community Service Projects"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    const fetchDataForMentorshipPrograms = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Mentorship Programs"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    const fetchDataForInternships = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "job"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    // Function to filter Alumni data to keep only the specified columns
    const filterAlumniData = (data) => {
        return data.map((item) => ({
            name: item.name,
            degree: item.degree,
            entryNo: item.entryNo,
            joiningYear: item.joiningYear,
            hostel: item.hostel,
            email: item.email,
            role: item.role,
            phone: item.phone,
            department: item.department,
            country: item.country,
            passingYear: item.passingYear,
            approved: item.approved,
            address: item.address,
            linkedin: item.linkedin,
        }));
    };

    const filterAdminData = (data) => {
        return data.map((item) => ({
            email: item.email,
            approved: item.approved,
        }));
    };

    // Function to filter "Giving Back in Kind" data to keep only the specified columns
    const filterGiveBackData = (data) => {
        return data.map((item) => ({
            name: item.name,
            degree: item.degree,
            department: item.department,
            itemName: item.itemName,
            duration: item.duration,
            phone: item.phone,
            email: item.email,
            hostel: item.hostel,
            entryNo: item.entryNo,
            passingYear: item.passingYear,
            country: item.country,
            linkedIn: item.linkedIn,
        }));
    };

    const filterPastReunionsData = (data) => {
        return data.map((item) => ({
            title: item.title,
            batch: item.batch,
            date: item.date,
            description: item.description,
        }));
    };

    const filterDataForTalks = (data) => {
        return data.map((item) => ({
            name: item.name,
            date: item.date,
            topic: item.topic,
            type: item.type,
            content: item.content,
            phone: item.phone,
            email: item.email,
        }));
    };

    const filterDataForWorkshops = (data) => {
        return data.map((item) => ({
            name: item.name,
            date: item.date,
            topic: item.topic,
            type: item.type,
            duration: item.duration,
            phone: item.phone,
            email: item.email,
        }));
    };

    // Function to export data to Excel
    const exportToExcel = (data) => {
        // Convert the data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate the Excel file as a binary string
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a blob from the binary string
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Create a link element and set the URL to the blob
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');

        // Trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Render form based on selected option
    const renderForm = () => {
        const handleDownloadClick = async () => {
            let data = [];

            // Determine which data to fetch based on the selected option
            switch (selectedOption) {
                case 'Alumni':
                    data = await fetchDataForAlumni();
                    break;
                case 'Give Back in Kind':
                    data = await fetchDataForGiveBack();
                    break;
                case 'Past Reunions':
                    data = await fetchDataForPastReunions();
                    break;
                case 'Planned Reunions':
                    data = await fetchDataForPlannedReunions();
                    break;
                case 'Admin':
                    data = await fetchDataForAdmin();
                    break;
                case 'Talks' :
                    data = await fetchDataForTalks();
                    break;
                case 'Workshops' :
                    data = await fetchDataForWorkshops();
                    break;
                case 'Startup Presentations' :
                    data = await fetchDataForStartupPresentations();
                    break;
                case 'Hackathons' :
                    data = await fetchDataForHackathons();
                    break;
                case 'Community Service Projects' :
                    data = await fetchDataForCommunityServiceProjects();
                    break;
                case 'Mentorship Programs' :
                    data = await fetchDataForMentorshipPrograms();
                    break;
                case 'Internships' :
                    data = await fetchDataForInternships();
                    break;
                default:
                    return null;
            }

            // Export the data to Excel
            exportToExcel(data);
        };

        const buttonStyle = {
            display: 'block',
            margin: '20px auto', // Centers the button
            padding: '10px 20px',
            backgroundColor: '#007bff', // Blue background color
            color: '#fff',
            borderRadius: '12px', // Rounded corners
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
        };

        switch (selectedOption) {
            case 'Home':
                return (
                    <>
                        <HomeProfile />
                        
                    </>
                );
            case 'Alumni':
                return (
                    <>
                        <UserListComponent />
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>
                    </>
                );
            case 'Give Back in Kind':
                return (
                    <>
                        <GivingBackInKindListComponent />
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>
                    </>
                );
            case 'Past Reunions':
                return (
                    <>
                        <PastReunionsList />
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>
                    </>
                );
            case 'Planned Reunions':
                return (
                    <>
                        <PlannedReunionsList />
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>
                    </>
                );
            case 'Admin':
                return (
                    <>
                        <AdminList/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Talks':
                return (
                    <>
                        <TalksListComponent/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Workshops':
                return (
                    <>
                        <WorkshopsListComponent/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Startup Presentations':
                return (
                    <>
                        <StartupPresentationsListComponent/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Hackathons':
                return (
                    <>
                        <HackathonsListComponent/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Community Service Projects':
                return (
                    <>
                        <CommunityServiceProjectsListComponent/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Mentorship Programs':
                return (
                    <>
                        <MentorshipProgramsListComponent/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Internships':
                return (
                    <>
                        <JobsListComponent/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            case 'Upload Data from Excel':
                return (
                    <>
                        <UploadForm/>
                        

                    </>
                )
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-row'>
            {/* <SidebarProfile setSelectedOption={setSelectedOption} /> */}
            <div className="ml-4 w-full" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
            {/* <SidebarProfile setSelectedOption={setSelectedOption} /> */}
            <div className="ml-4 w-full">
                {selectedOption && (
                    <div className='w-full'>
                        {renderForm()}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
   
};

export default DataList;
