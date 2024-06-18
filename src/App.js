import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState hook if not already imported
import Home from './pages/Home';
import Donate from './pages/Donate';
import Accordion from './pages/Accordion';
// import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Contact from './pages/Contact';
import CommunityEvents from './pages/CommunityEvents'
import { AuthProvider } from './utilities/AuthContext';
import GivingBack from './pages/GivingBack';
import NewAndUpdates from './pages/NewAndUpdates';
import GiveToIITRopar from './pages/GiveToIITRopar';
import PrivateRoute from './PrivateRoute';
import BecomeAMember from './pages/BecomeAMember';
import NewsAndUpdatesAdmin from './pages/NewsAndUpdatesAdmin';
import ProfMessageAdmin from './pages/ProfMessageAdmin';
import CommunityEventsAdmin from './pages/CommunityEventsAdmin';
import SmartID from './pages/SmartID';
import AlumniCard from './pages/AlumniCard';
import Events from './pages/Events';
import Fund from './pages/Fund';
import SpecialProject from './pages/SpecialProject';
import GeneralPurpose from './pages/GeneralPurpose';
import FinancialAidProgram from './pages/FinancialAidProgram';
import LegacyProjects from './pages/LegacyProjects';
import FacultyProgram from './pages/FacultyProgram';
import HostelProject from './pages/HostelProject';
import ProjectDetails from './pages/ProjectDetails';
import Jobs from './pages/Jobs';
import UserListComponent from './components/UserListComponent';
import PastReunionsList from './components/PastReunionsList';
import PlannedReunionsList from './components/PlannedReunionsList';
import AdminList from './components/AdminList';
import GivingBackInKindListComponent from './components/GivingBackInKindList';
import FundraisingPages from './pages/FundraisingPages';
import RegistrationsPage from './components/RegistrationsPage';
import TableComponent from './pages/TableComponent';
import Profile2adminside from './pages/Profile2adminside';
import UploadForm from './components/UploadForm';
import ExecutiveCommittee from './pages/ExecutiveCommittee';
import Constitution from './pages/Constitution';
import DataList from './components/DataList';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/homeprofile" element={<HomeProfile />} /> */}
          <Route exact path='/profile' element={<PrivateRoute/>}>
            <Route exact path='/profile' element={<Profile/>}/>
          </Route>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/fund" element={<Fund />} />
          <Route exact path="/GivingBack" element={<GivingBack />} />
          <Route exact path="/Donate" element={<Donate />} />
          <Route exact path="/ContactUs" element={<Contact />} />
          <Route exact path="/CommunityEvents" element={<CommunityEvents />} />
          <Route exact path="/givingBack" element={<GivingBack />} />
          <Route exact path="/News" element={<NewAndUpdates />} />
          <Route exact path="/givetoiitropar" element={<GiveToIITRopar />} />
          <Route exact path="/BecomeAMember" element={<BecomeAMember />} />
          <Route exact path="/newsadmin" element={<NewsAndUpdatesAdmin />} />
          <Route exact path="/ProfMessageAdmin" element={<ProfMessageAdmin />} />
          <Route exact path="/CommunityEventsAdmin" element={<CommunityEventsAdmin/>} />
          <Route exact path="/SmartID" element={<SmartID/>} />
          <Route exact path="/AlumniCard" element={<AlumniCard/>} />
          <Route exact path="/special-projects" element={<SpecialProject/>} />
          <Route exact path="/general-purpose" element={<GeneralPurpose/>} />
          <Route exact path="/financial-aid-program" element={<FinancialAidProgram/>} />
          <Route exact path="/legacy-projects" element={<LegacyProjects/>} />
          <Route exact path="/faculty-program" element={<FacultyProgram/>} />
          <Route exact path="/hostel-project" element={<HostelProject/>} />
          <Route exact path="/project/:id" element={<ProjectDetails />} />
          <Route exact path="/table" element={<TableComponent />} />
          <Route exact path="/ExecutiveCommittee" element={<ExecutiveCommittee />} />
          <Route exact path="/Constitution" element={<Constitution />} />
          {/* <Route exact path="/alumni" element={<UserListComponent/>} />
          <Route exact path="/givebackinkind" element={<GivingBackInKindListComponent/>} /> */}
          <Route exact path='/events' element={<PrivateRoute/>}>
            <Route exact path="/events" element={<Events/>} />
          </Route>
          <Route exact path="/Jobs" element={<Jobs/>} />
          <Route path="/FundraisingPages/:id" element={<FundraisingPages />} />
          <Route path="/registrations/:batch" element={<RegistrationsPage/>} />
          <Route exact path="/profile2adminside" element={<Profile2adminside />} />
          <Route path="/upload" element={<UploadForm/>} />
          <Route exact path="/dataList" element={<DataList/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
