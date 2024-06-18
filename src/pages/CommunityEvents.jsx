import React, {useContext, useState, useEffect, useRef}  from 'react'
import Gallery from '../components/Gallery'
import './CommunityEvents.css' // Assuming you have a CSS file for this component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import {db} from "../firebase.js";
import { addDoc, collection, query, where, getDocs , getDoc, doc, updateDoc} from "firebase/firestore";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate  } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css';
import { reload } from 'firebase/auth';

const CommunityEvents = () => {
  const navigate = useNavigate(); 
  const [plannedReunions, setPlannedReunions] = useState([]);
  const [pastReunions, setPastReunions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });
  const [currtitle, setCurrtitle] = useState('');
  const [userregistered, setuserregistered] = useState([]);
  const toast = useRef(null);
  const [userData, setUserData] = useState(null);
  const isAdmin = localStorage.getItem("isAdmin");

  
  useEffect(() => {
    const fetchPlannedReunions = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const colRef = collection(db, 'Users');
        const q = query(colRef, where('uid', '==', userId));
        const snapshot1 = await getDocs(q);
        let email = null;
        if (snapshot1.size > 0) {
          email = snapshot1.docs[0].data().email;
        }
    
        const plannedReunionData = [];
    
        const snapshot = await getDocs(collection(db, 'plannedReunions'));
    
        snapshot.forEach(doc => {
          const reunion = doc.data();
          if(reunion.registeredCandidates){
            if (email && reunion?.registeredCandidates.some(candidate => candidate.email === email)) {
              userregistered.push(reunion.title);
            }
          }
          plannedReunionData.push(reunion);
        });
    
        setPlannedReunions(plannedReunionData);
      } catch (error) {
        console.error('Error fetching planned reunion data: ', error);
      }
    };

    const fetchPastReunions = async () => {
      try {
        const pastReunionData = [];
        const snapshot = await getDocs(collection(db, 'pastReunions'));

        snapshot.forEach(doc => {
          const reunion = doc.data();
          pastReunionData.push(reunion);
        });

        setPastReunions(pastReunionData);
      } catch (error) {
        console.error('Error fetching past reunion data: ', error);
      }
    };

    fetchPlannedReunions();
    fetchPastReunions();
  }, []);

  useEffect(() => {
    if (currtitle !== '') {
      console.log(currtitle);
      confirm1();
    }
  }, [currtitle]);


  const accept = async () => {

    try {
        // Get the userId from localStorage
        const userId = localStorage.getItem("userId");

        const colRef = collection(db, 'Users');
        const q = query(colRef, where('uid', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.size > 0) {
            const { name, email, entryNo } = snapshot.docs[0].data();
            console.log(name, email, entryNo);

            const plannedReunionRef = collection(db, 'plannedReunions');
            const reunionQuery = query(plannedReunionRef, where('title', '==', currtitle));
            console.log(currtitle);
            const reunionSnapshot = await getDocs(reunionQuery);

            if (reunionSnapshot.size > 0) {
                reunionSnapshot.forEach((reunionDoc) => {
                  const data = reunionDoc.data();
                    const isAlreadyRegistered = data.registeredCandidates?.some(candidate => candidate.email === email);

                    if (!isAlreadyRegistered) {
                        confirmDialog({
                          message: 'Please pay the fees amount:',
                          header: 'Fees Confirmation',
                          icon: 'pi pi-info-circle',
                          acceptLabel: 'Continue to pay',
                          rejectLabel: 'Cancel',
                          style: { width: '350px' , display: 'flex',justifyContent: 'space-between' },
                          accept: (fees) => {
                              console.log('Fees accepted:', fees);
                              const updatedCandidates = [...(data.registeredCandidates || []), { name, email, entryNo }];
                              updateDoc(doc(db, 'plannedReunions', reunionDoc.id), { registeredCandidates: updatedCandidates }, { merge: true });
                              toast.current.show({ severity: 'info', summary: 'Confirmed', detail: `You are Successfully Registered `, life: 3000 });
                              setTimeout(() => {
                                  window.location.reload();
                              }, 1000); // Reload after 3 seconds
                          },
                          reject: () => {
                              console.log('Fees rejected');
                              // You can handle rejection here if needed
                          },
                      });
                    } else {
                        console.log('Already registered');
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'User Already Registered', life: 3000 });
                    }
                });
            } else {
                console.error('Planned reunion document not found');
            }

        } else {
            console.error('User document not found');
        }
    } catch (error) {
        console.error('Error fetching user data: ', error);
        // Show toast with error message
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch user data', life: 3000 });
    }
}



  const reject = () => {
      // toast.current.show({ severity: 'warn', summary: 'Rejected', life: 3000 });
  }

  const confirm1 = () => {
      console.log("clicked");
      confirmDialog({
          message: 'Are you sure you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept,
          reject
      });
  };


  const renderPlannedReunionRow = (batch, year, date,fees, title) => {
    const isRegistered = userregistered.includes(title);

    const registerButtonClickHandler = () => {
      if (!isRegistered) {

        setCurrtitle(title);
        confirm1();
      }
    };
    return (
      <tr key={batch}>
        <td>{batch}</td>
        <td>{date}</td>
        <td>{title}</td>
        <td>{fees}</td>
        <td>
          {isLoggedIn ? (
            <Button
              className={`reunion-button`}
              onClick={registerButtonClickHandler}
              icon={isRegistered ? "pi pi-check" : ""}
              label={isRegistered ? "Registered" : "Register"}
              disabled={isRegistered}
            ></Button>
          ) : (
            <div
              className={`w-[80px] h-8 ml-1 flex items-center text-[18px] justify-center rounded-lg cursor-pointer bg-blue-500 text-white`}
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </div>
          )}
        </td>
      </tr>
    );
  };
  

  const renderPastReunionCard = (image, title, date, description) => (
    <div className='card' key={title}>
      <img src={image} alt={title} />
      <div className='card-info'>
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className='community-events-heading'>
        <h1>  <FontAwesomeIcon icon={faHandshake } />  Reunions</h1>
      </div>
      <Gallery/>

      <div className='main-container'>
        <div className='container-1'>
          <img src="/images/car1.jpg" alt="Donate Image" />
          <div className='note'>
            <h1>CLASS REUNIONS 2024-25</h1>
            <p> The Office of Alumni Relations and Alumni Association at IIT Ropar have been organizing reunions for different batches over the years. The institute feels immense pride in welcoming back and hosting alumni again on the campus. Reunions for various batches have been planned in the year 2023-24 at IIT Ropar. We encourage alumni to attend these events and meet fellow batchmates.
                <br/>The Reunions are typically held in Ropar with an Institute Day at the IIT Ropar Campus. Batches plan the events over a 2-3 day period with fun engagement activities at Campus or Off-Site, plans are customized by each batch as per their preferences.
                <br/>Some batches who could not celebrate their designated reunions during Covid impacted year(s) are also planning to organize their reunions this year.
                <br/>Office Of Alumni Association, IIT Ropar
                <br/>Email : alumni@iitrpr.ac.in
            </p>
          </div>
        </div>
      </div>
      <div className='container-3'><h1>LIST OF REUNIONS PLANNED FOR FY 2024</h1></div>
      <div className='container-2'>
        <table>
          <thead>
            <tr>
              <th>Batch</th>
              <th>Date</th>
              <th>Title</th>
              <th>Fees</th>
              <th>Register </th>
            </tr>
          </thead>
          <tbody>
            {plannedReunions.map(reunion => (
              renderPlannedReunionRow(reunion.batch, reunion.year, reunion.date,reunion.fees, reunion.title)
            ))}
          </tbody>
        </table>
      </div>
      <div>
          {isAdmin==="true" ? (
            <div className="flex flex-row mb-2 justify-center">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8 "
                onClick={() => navigate("/CommunityEventsAdmin")}
              >
                Edit Planned Reunions
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      <div className='past-reunion-heading'> <h1 >Past Reunions</h1> </div>
      <div className='past-reunions'>
        {pastReunions.map(reunion => (
          renderPastReunionCard(reunion.imageUrl, reunion.title, reunion.date, reunion.description)
        ))}
      </div>
      <div>
        {isAdmin==="true" ? (
          <div className="flex flex-row mb-2 justify-center">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8 "
              onClick={() => navigate("/CommunityEventsAdmin")}
            >
              Edit Past Reunions
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default CommunityEvents