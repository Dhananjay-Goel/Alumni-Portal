import React, { useState } from 'react';
import EventsSidebar from '../components/EventsSidebar';
import { BsChatDots, BsBriefcase, BsLightbulb } from "react-icons/bs";
import TalksForm from '../components/TalksForm';
import WorkshopsForm from '../components/WorkshopsForm';
import StartupPresentationsForm from '../components/StartupPresentationsForm';
import MentorshipProgramForm from '../components/MentorshipProgramForm';
import CommunityServiceProjectsForm from '../components/CommunityServiceProjectsForm';
import HackathonsForm from '../components/HackathonsForm';

const Events = () => {
    const [selectedOption, setSelectedOption] = useState('Talks');

    // Function to render icon based on selected option
    const renderIcon = () => {
        switch (selectedOption) {
            case 'Talks':
                return <BsChatDots className="inline-block mr-2" size={24} />;
            case 'Workshops':
                return <BsBriefcase className="inline-block mr-2" size={24} />;
            case 'Startup Presentations':
                return <BsLightbulb className="inline-block mr-2" size={24} />;
            default:
                return null;
        }
    };

    const renderForm = () => {
        console.log(selectedOption);
        switch (selectedOption) {
            case 'Talks':
                return <TalksForm />;
            case 'Workshops':
                return <WorkshopsForm />;
            case 'Startup Presentations':
                return <StartupPresentationsForm />;
            case 'Mentorship Programs':
                return <MentorshipProgramForm/>;
            case 'Community Service Projects':
                return <CommunityServiceProjectsForm/>
            case 'Hackathons':
                return <HackathonsForm/>
            default:
                return null;
        }
    };

    return (
        <div className="flex">
            <EventsSidebar setSelectedOption={setSelectedOption} />
            <div className="ml-4 w-full">
                {selectedOption && (
                    <div className='w-full'>
                        {renderForm()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
