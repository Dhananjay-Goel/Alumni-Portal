import React, { useState, useMemo, useEffect } from "react";
import { Checkmark } from "react-checkmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCheckSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./BecomeAMember.css"; // Assuming you have a CSS file for this component
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  getDoc,
  setDoc
} from "firebase/firestore";

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const BecomeAMember = () => {
  const location = useLocation();
  const [isFormSubmitted, setIsFormSubmitted] = useState(0);
  const [ischeckbox, setIsWorkingProfessional] = useState(0);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymantoption, setpaymentoption] = useState("");
  const { userId, email } = location.state || {};
  const isAdmin = localStorage.getItem("isAdmin");
  const [editedUser, setEditedUser] = useState({
    name: '',
    phone: '',
    contrycode: '',
    entryNo: '',
    country: '',
    hostel: '',
    degree: '',
    department: '',
    passingYear: '',
    joiningYear: '',
    work_exp: [{}],
    higherEducation: [{}],// Store work experience as an array
    others: '',
    profileURL: '',
    email: '',
    approved: false,
    primaryemail: "",
    additional_degree: "",
    por: "",
    placeofposting: "",
    suggestions: ""

  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [yearlyMembership, setYearlyMembership] = useState("");
  const [lifetimeMembership, setLifetimeMembership] = useState("");
  const [yearlyMembershipFee, setYearlyMembershipFee] = useState("");
  const [lifetimeMembershipFee, setLifetimeMembershipFee] = useState("");

  useEffect(() => {
    checkLoggedIn();
    fetchMembershipFees();
  });

  const checkLoggedIn = () => {
    setIsLoggedIn(localStorage.getItem("userId") !== null);
  };

  const fetchMembershipFees = async () => {
    const docRef = doc(db, "membership", "options");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setLifetimeMembershipFee(data.lifetimeMembership);
      setYearlyMembershipFee(data.yearlyMembership);
    }
  };

  const notifySuccess = (message) => {
    toast.success(message, toastOptions);
  };
  let errormsg = "";

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the database with the new membership values
      await updateMembershipOptions(yearlyMembership, lifetimeMembership);

      // Show success message
      notifySuccess("Membership options updated successfully!");
      setYearlyMembership("");
      setLifetimeMembership("");
    } catch (error) {
      console.error("Error updating membership options:", error);
      // Show error message
      let errormsg = "Error updating membership options";
      toast.error(errormsg, toastOptions);
    }
  };

  const updateMembershipOptions = async (yearlyMembership, lifetimeMembership) => {
    const membershipRef = doc(db, "membership", "options");

    // Check if the document exists
    const docSnap = await getDoc(membershipRef);
    if (docSnap.exists()) {
      // Document exists, update it
      await updateDoc(membershipRef, {
        yearlyMembership,
        lifetimeMembership,
      });
    } else {
      // Document does not exist, create it
      await setDoc(membershipRef, {
        yearlyMembership,
        lifetimeMembership,
      });
    }
  };



  const navigate = useNavigate();
  if (isAdmin === "true") {
    return (
      <div className="admin-form mb-2 mx-auto flex flex-col items-center bg-white rounded-lg shadow-lg">
        <div className="community-events-heading animate__animated animate__fadeInUp w-full flex justify-center">
          <h1 className="text-2xl font-bold mb-0 px-10 py-2 text-blue-700 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Membership Fees
          </h1>
        </div>
        <form onSubmit={handleAdminFormSubmit} className="items-center p-4 mt-2">
          <label htmlFor="yearlyMembership" className="font-semibold block mb-1">Yearly Membership:</label>
          <input
            type="text"
            id="yearlyMembership"
            value={yearlyMembership}
            onChange={(e) => setYearlyMembership(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="lifetimeMembership" className="font-semibold block mb-1 mt-4">Lifetime Membership:</label>
          <input
            type="text"
            id="lifetimeMembership"
            value={lifetimeMembership}
            onChange={(e) => setLifetimeMembership(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 mb-4">Update Memberships</button>
        </form>
      </div>
    );
  }
  if (isLoggedIn) {
    navigate("/home");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mandatoryFields = [
      "name",
      "primaryemail",
      "phone",
      "contrycode",
      "entryNo",
      "country",
      "hostel",
      "degree",
      "department",
      "passingYear",
      "joiningYear",
      "placeofposting"

    ];
    const missingFields = mandatoryFields.filter((field) => !editedUser[field]);
    if (missingFields.length > 0) {
      setErrorMessage("Please fill in all mandatory fields.");
      return;
    }
    if (!/^\d{4}[A-Za-z]{3}\d{4}$/.test(editedUser["entryNo"])) {
      setErrorMessage("Please enter a valid Entry Number.");
      return;
    }
    if (
      editedUser["passingYear"].length !== 4 ||
      isNaN(editedUser["passingYear"])
    ) {
      setErrorMessage("Please enter a valid 4-digit year");
      return;
    }
    if (
      editedUser["joiningYear"].length !== 4 ||
      isNaN(editedUser["joiningYear"])
    ) {
      setErrorMessage("Please enter a valid 4-digit year");
      return;
    }
    if (
      parseInt(editedUser["passingYear"], 10) <
      parseInt(editedUser["joiningYear"], 10)
    ) {
      setErrorMessage("Joining Should be before Passing");
      return;
    }
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(editedUser["passingYear"], 10);
    if (currentYear < inputYear) {
      setErrorMessage("Passing year should be less than current year");
      return;
    }
    if (editedUser["phone"].length !== 10 || isNaN(editedUser["phone"])) {
      setErrorMessage("Please enter a valid 10-digit phone number");
      return;
    }
    const colRef = collection(db, "Users");
    const q = query(colRef, where("entryNo", "==", editedUser["entryNo"]));
    const snapshot = await getDocs(q);
    console.log(snapshot);
    console.log(snapshot.size);
    if (snapshot.size > 0) {
      setErrorMessage("User Already a member");
      return;
    }
    setIsFormSubmitted(1);
    setErrorMessage("");
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (ischeckbox === 1) {
      const isWorkExpValid = editedUser.work_exp.every((workExp) => {
        return (
          workExp &&
          workExp.job_title &&
          workExp.company &&
          workExp.industry &&
          workExp.startYear &&
          workExp.endYear
        );
      });

      const isWorkYear = editedUser.work_exp.every((workExp) => {
        return (
          workExp &&
          !isNaN(workExp.startYear) &&
          (!isNaN(workExp.endYear) || workExp.endYear === "Present" || workExp.endYear === "present") &&
          workExp.startYear.length === 4 &&
          (workExp.endYear.length === 4 || workExp.endYear === "Present" || workExp.endYear === "present")
        );
      });

      const joining_passing = editedUser.work_exp.every((workExp) => {
        return (
          workExp &&
          !isNaN(workExp.startYear) &&
          (!isNaN(workExp.endYear) || workExp.endYear === "Present" || workExp.endYear === "present") &&
          (parseInt(workExp.startYear, 10) < parseInt(workExp.endYear, 10) || workExp.endYear === "Present" || workExp.endYear === "present")
        );
      });

      if (!isWorkExpValid) {
        // If any field is missing in work experience, set the error message
        setErrorMessage("Please fill in all mandatory fields.");
        return;
      }
      if (!isWorkYear) {
        setErrorMessage("Please enter a valid 4-digit year");
        return;
      }
      if (!joining_passing) {
        setErrorMessage("Start date should be before end date.");
        return;
      }
    } else if (ischeckbox === 3) {
      if (!editedUser.others) {
        // If others section is selected but the field is missing, set the error message
        setErrorMessage("Please fill in all mandatory fields.");
        return;
      }
    } else if (ischeckbox === 2) {
      const isEduExpValid = editedUser.higherEducation.every((highEdu) => {
        return (
          highEdu &&
          highEdu.institute &&
          highEdu.degree &&
          highEdu.department &&
          highEdu.startYear &&
          highEdu.endYear
        );
      });


      const isEduYear = editedUser.higherEducation.every((highEdu) => {
        return (
          highEdu &&
          (!isNaN(highEdu.endYear) || highEdu.endYear === "Present" || highEdu.endYear === "present") &&
          !isNaN(highEdu.startYear) &&
          highEdu.startYear.length === 4 &&
          (highEdu.endYear.length === 4 || highEdu.endYear === "Present" || highEdu.endYear === "present")
        );
      });

      const joining_passing = editedUser.higherEducation.every((highEdu) => {
        return (
          highEdu &&
          (!isNaN(highEdu.endYear) || highEdu.endYear === "Present" || highEdu.endYear === "present") &&
          !isNaN(highEdu.startYear) &&
          (parseInt(highEdu.startYear, 10) < parseInt(highEdu.endYear, 10) || highEdu.endYear === "Present" || highEdu.endYear === "present")
        );
      });

      if (!isEduExpValid) {
        setErrorMessage("Please fill in all mandatory fields.");
        return;
      }
      if (!isEduYear) {
        setErrorMessage("Please enter a valid 4-digit year");
        return;
      }

      if (!joining_passing) {
        setErrorMessage("Start date should be before end date.");
        return;
      }
    } else {
      errormsg = "Select What are you doing currently.";
      console.log(errormsg);
      toast.error(errormsg, toastOptions);
      return;
    }

    setIsFormSubmitted(2);
    setErrorMessage("");
  };

  const handleworking = (e) => {
    setIsWorkingProfessional(1);
    if (!e.target.checked) {
      setIsWorkingProfessional(0);
    }
    setEditedUser({
      ...editedUser,
      higherEducation: [{}],
      others: "",
    });
  };

  const handleeducation = (e) => {
    setIsWorkingProfessional(2);
    if (!e.target.checked) {
      setIsWorkingProfessional(0);
    }
    setEditedUser({
      ...editedUser,
      work_exp: [{}],
      others: "",
    });
  };

  const handleothers = (e) => {
    setIsWorkingProfessional(3);
    if (!e.target.checked) {
      setIsWorkingProfessional(0);
    }
    setEditedUser({
      ...editedUser,
      higherEducation: [{}],
      work_exp: [{}],
    });
  };

  const addWorkExperience = () => {
    setEditedUser({
      ...editedUser,
      work_exp: [...editedUser.work_exp, {}],
    });
  };

  const removeWorkExperience = () => {
    // Create a new array excluding the last education detail
    const newwork_exp = editedUser.work_exp.slice(0, -1);

    // Update the state with the new array
    setEditedUser({
      ...editedUser,
      work_exp: newwork_exp,
    });
  };

  const addEducationDetail = () => {
    // Add an empty work experience object to the array
    setEditedUser({
      ...editedUser,
      higherEducation: [...editedUser.higherEducation, {}],
    });
  };

  const removeEducationDetail = () => {
    // Create a new array excluding the last education detail
    const newHigherEducation = editedUser.higherEducation.slice(0, -1);

    // Update the state with the new array
    setEditedUser({
      ...editedUser,
      higherEducation: newHigherEducation,
    });
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSignUpClick = async () => {
    const docRef = await addDoc(collection(db, "Users"), {
      uid: userId,
      email: email,
    });
    const userDocRef = doc(db, "users", userId);
    const colRef = collection(db, "Users");
    const q = query(colRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      // Get the reference to the first matching document
      const docRef = doc(db, 'Users', querySnapshot.docs[0].id);
      editedUser['email'] = email;
      console.log(profilePicture);
      if (profilePicture) {
        const storageRef = ref(storage, `/files/${editedUser['entryNo']}`)
        console.log("stor ref: ", storageRef);
        const uploadTask = uploadBytesResumable(storageRef, profilePicture);

        uploadTask.on(
          "state_changed",
          (snapshot) => { },
          (err) => console.log(err),
          async () => {
            console.log("innnn");
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const updatedEditedUser = { ...editedUser, profileURL: url };
            console.log(updatedEditedUser);
            await updateDoc(docRef, updatedEditedUser);
            // localStorage.setItem("userId", userId);
            console.log('Document successfully updated!');
            notifySuccess("Request Send for Approval");
            navigate('/home');
          }
        );
        // console.log(profileURL);
      }
      else {
        console.log(editedUser);
        await updateDoc(docRef, editedUser);
        // localStorage.setItem("userId", userId);
        console.log('Document successfully updated!');
        notifySuccess("Request Send for Approval");
        navigate('/home');
      }
    } else {
      console.log("No documents found for the given query.");
      errormsg = "User needs to signup first";
      toast.error(errormsg, toastOptions);
      return;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedUser({
      ...editedUser,
      [name]: value,
    });
    console.log(editedUser);
  };

  const handleInputChangeWorkExp = (e, index) => {
    const { name, value } = e.target;
    const updatedWorkExp = [...editedUser.work_exp];
    updatedWorkExp[index] = { ...updatedWorkExp[index], [name]: value };
    setEditedUser({ ...editedUser, work_exp: updatedWorkExp });
  };

  const handleInputChangeHigherEdu = (e, index) => {
    const { name, value } = e.target;
    const updatedHigherEdu = [...editedUser.higherEducation];
    updatedHigherEdu[index] = { ...updatedHigherEdu[index], [name]: value };
    setEditedUser({
      ...editedUser,
      higherEducation: updatedHigherEdu,
    });
    console.log(editedUser);
  };

  return (
    <div>
      <div className="Become-Member-heading">
        <h1>
          {" "}
          <FontAwesomeIcon icon={faUsers} /> Become A Member{" "}
        </h1>
      </div>
      <div className="member-info">
        {isFormSubmitted === 1 ? (
          <div className="member-form-container2">
            <h1> Let us know a bit more about you </h1>
            <p>Fields marked * are mandatory</p>
            <form>
              <div className="member-form-inside2">
                <label>
                  What are you doing currently?
                  <br />
                  <br />
                  <input
                    type="radio"
                    name="activity"
                    value="working"
                    onChange={handleworking}
                  />{" "}
                  Working as a professional
                  <br />
                  <br />
                  <input
                    type="radio"
                    name="activity"
                    value="Education"
                    onChange={handleeducation}
                  />{" "}
                  Pursuing higher Studies
                  <br />
                  <br />
                  <input
                    type="radio"
                    name="activity"
                    value="Others"
                    onChange={handleothers}
                  />{" "}
                  Others
                  <br />
                  <br />
                </label>
              </div>
            </form>
            {ischeckbox === 2 ? (
              <div className="working-details">
                {editedUser.higherEducation.map((highEdu, index) => (
                  <div key={index} className="working-details-inside">
                    <label>
                      Name Of Institute:
                      <br />
                      <input
                        type="text"
                        name="institute"
                        placeholder="Ex. IIM Ahemdabad"
                        value={highEdu.institute || ""}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      Degree:
                      <br />
                      <input
                        type="text"
                        name="degree"
                        placeholder="MBA"
                        value={highEdu.degree || ""}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      Department
                      <br />
                      <input
                        type="text"
                        name="department"
                        placeholder="Marketing"
                        value={highEdu.department || ""}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      Start Year:
                      <br />
                      <input
                        type="text"
                        name="startYear"
                        placeholder="Year"
                        value={highEdu.startYear || ""}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      End Year: (Write Present if currently going on)
                      <br />
                      <input
                        type="text"
                        name="endYear"
                        placeholder="Year"
                        value={highEdu.endYear || ""}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                      />
                    </label>
                    <br />
                  </div>
                ))}
                <button onClick={addEducationDetail} className="add-div-button">
                  {" "}
                  Add Education Details
                </button>
                <button
                  onClick={removeEducationDetail}
                  className="add-div-button"
                >
                  Remove
                </button>
              </div>
            ) : ischeckbox === 1 ? (
              <div className="working-details">
                {editedUser.work_exp.map((workExp, index) => (
                  <div key={index} className="working-details-inside">
                    <label>
                      Work title:
                      <br />
                      <input
                        type="text"
                        name="job_title"
                        placeholder="Ex- Software Developer"
                        value={workExp.job_title || ""}
                        onChange={(e) => handleInputChangeWorkExp(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      Company Name:
                      <br />
                      <input
                        type="text"
                        name="company"
                        placeholder="Ex. Google"
                        value={workExp.company || ""}
                        onChange={(e) => handleInputChangeWorkExp(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      Work Industry:
                      <br />
                      <input
                        type="text"
                        name="industry"
                        placeholder="Ex. E-commerce"
                        value={workExp.industry || ""}
                        onChange={(e) => handleInputChangeWorkExp(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      Start Year:
                      <br />
                      <input
                        type="text"
                        name="startYear"
                        placeholder="Year"
                        value={workExp.startYear || ""}
                        onChange={(e) => handleInputChangeWorkExp(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                      End Year: (Write Present if currently going on)
                      <br />
                      <input
                        type="text"
                        name="endYear"
                        placeholder="Year"
                        value={workExp.endYear || ""}
                        onChange={(e) => handleInputChangeWorkExp(e, index)}
                      />
                    </label>
                    <br />
                  </div>
                ))}
                <button onClick={addWorkExperience} className="add-div-button">
                  {" "}
                  Add work Experience
                </button>
                <button
                  onClick={removeWorkExperience}
                  className="add-div-button"
                >
                  {" "}
                  Remove
                </button>
              </div>
            ) : ischeckbox === 3 ? (
              <div>
                <label>
                  Others
                  <br />
                  <input
                    type="text"
                    name="others"
                    className="text_input-member"
                    value={editedUser.others}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            ) : (
              <div></div>
            )}
            <br />
            <br />

            <form>
              <h2>Upload Profile Photo</h2>
              <input
                name="profilepic"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </form>
            <br />
            <div className="member-button">
              {errorMessage !== "" ? (
                <div className="error-message-mandatory-fields">
                  {errorMessage}
                </div>
              ) : (
                <p></p>
              )}
              <button
                type="submit"
                className="submit-member"
                onClick={handleSubmit2}
              >
                Next Step
              </button>
            </div>
          </div>
        ) : isFormSubmitted === 2 ? (
          <div className="member-form-container">
            <h1> Pay Member Fees for joining the Alumni Network: </h1>
            <br />
            <div className="member-form-payment">
              <div className="member-form-payment2">
                <h2> Membership Fees: </h2>
                <br />
                <div className="membership-card-box">
                  <div className="membership-card">
                    <h3> Yearly Membership <br /> {yearlyMembershipFee} Rs</h3>
                  </div>
                  <br />
                  <div className="membership-card">
                    <h3> Lifetime Membership <br /> {lifetimeMembershipFee} Rs</h3>
                  </div>
                </div>
                <label>
                  Choose the Payment Option :
                  <br />
                  <select
                    name="paymenttype"
                    className="text_input-member"
                    value={paymantoption}
                    onChange={(e) => setpaymentoption(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="Yearly">Yearly Membership</option>
                    <option value="student">Lifetime Membership</option>
                  </select>
                </label>
                <div
                  className=" mt-[30px] ml-[40px] py-[4px] w-[400px] h-[40px] bg-indigo-800 text-white text-[27px] font-bold font-serif cursor-pointer"
                  onClick={() => setIsFormSubmitted(3)}
                >
                  <p>Continue to Payment Conformation</p>
                </div>
              </div>
              <div>
                <img src="/images/payment.jpg" />
              </div>
            </div>
          </div>
        ) : isFormSubmitted === 3 ? (
          <div className="member-form-container2">
            <Checkmark />
            <div className="member-form-container3">
              <h1>
                {" "}
                Thank You {editedUser["name"]}, for joining IIT Ropar Alumni
                Network{" "} <br />
              </h1>
            </div>
            <div className="becomemember-payment"></div>
            <div className="member-button">
              <button
                type="submit"
                className="submit-member"
                onClick={handleSignUpClick}
              >
                Home
              </button>
            </div>
          </div>
        ) : (
          <div className="member-form-container">
            <h1>
              {" "}
              Add your role details in - Indian Institute of Technology Ropar{" "}
            </h1>
            <p>Fields marked * are mandatory</p>
            <form className="form1" onSubmit={handleSubmit}>
              <div className="member-form-inside ">
                <div className="member-column1">
                  <label>
                    Full Name*
                    <br />
                    <input
                      type="text"
                      name="name"
                      className="text_input-member"
                      placeholder="Your Name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Entry Number*
                    <br />
                    <input
                      type="text"
                      className="text_input-member"
                      name="entryNo"
                      placeholder="Entry Number"
                      value={editedUser.entryNo}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Year of Joining*
                    <br />
                    <input
                      className="text_input-member"
                      type="year"
                      name="joiningYear"
                      value={editedUser.joiningYear}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    Degree*
                    <br />
                    <select
                      id="course-degree"
                      name="degree"
                      value={editedUser.degree}
                      onChange={handleInputChange}
                      className="text_input-member"
                    >
                      <option value="">Choose</option>
                      <option value="undergraduate">
                        Undergraduate (B.Tech/B.E./B.Sc.)
                      </option>
                      <option value="masters">Masters (M.Tech/M.Sc.)</option>
                      <option value="phd">Ph.D</option>
                      <option value="dual-degree">Dual Degree</option>
                      <option value="others">Others</option>
                    </select>
                  </label>
                  <label>
                    Your Hostel*
                    <br />
                    <select
                      name="hostel"
                      className="text_input-member"
                      value={editedUser.hostel}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose</option>
                      <option value="chenab">Chenab</option>
                      <option value="ravi">Ravi</option>
                      <option value="satluj">Satluj</option>
                      <option value="bhramputra">Brahmaputra</option>
                      <option value="beas">Beas</option>
                      {/* Add more options as needed */}
                    </select>
                  </label>
                  <label>
                    Place of Posting*
                    <br />
                    <input
                      type="text"
                      name="placeofposting"
                      className="text_input-member"
                      placeholder="Place of Posting"
                      value={editedUser.placeofposting}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Admin Positions held at IIT Ropar
                    <br />
                    <input
                      type="text"
                      name="por"
                      className="text_input-member"
                      placeholder="Position of Responsibility"
                      value={editedUser.por}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="member-column2">
                  <label>
                    Primary Email*
                    <br />
                    <input
                      type="text"
                      className="text_input-member"
                      name="primaryemail"
                      placeholder="Primary Email"
                      value={editedUser.primaryemail}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    Your Phone/WhatsApp Number*
                    <br />
                    <select
                      id="country-code"
                      name="contrycode"
                      value={editedUser.contrycode}
                      onChange={handleInputChange}
                    >
                      <option value="0"></option>
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      className="text_input-member"
                      placeholder="Phone Number"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    Year of Passing*
                    <br />
                    <input
                      type="text"
                      className="text_input-member"
                      name="passingYear"
                      value={editedUser.passingYear}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    Your Department at IIT Ropar*
                    <br />
                    <select
                      name="department"
                      className="text_input-member"
                      value={editedUser.department}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose</option>
                      <option value="CSE">Computer Science</option>
                      <option value="EE">Electrical</option>
                      <option value="ME">Mechanical</option>
                      <option value="MnC">Mathematics and Computing</option>
                      <option value="CH">Chemical</option>
                      <option value="Civil">Civil</option>
                      <option value="EP">Engineering Physics</option>
                      <option value="Ai">Artifical Intelligence</option>
                      <option value="ME">Metalurgy Engineering</option>
                      <option value="DS">Data Science</option>
                      <option value="bio">Biomedical</option>
                      <option value="Maths">Maths</option>
                      <option value="Phy">Physics</option>
                      <option value="chem">Chemistry</option>
                      <option value="Humanities">Humanities</option>
                    </select>
                  </label>
                  <label>
                    Current Country of Residence*
                    <br />
                    <input
                      type="text"
                      name="country"
                      className="text_input-member"
                      placeholder="Country"
                      value={editedUser.country}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Additional Degree
                    <br />
                    <select
                      name="additional_degree"
                      className="text_input-member"
                      value={editedUser.additional_degree}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose</option>
                      <option value="minor">Minor</option>
                      <option value="concentration">Conc.</option>
                      <option value="honors">Honors</option>
                      <option value="additional internship">Additional Intern</option>
                      <option value="dual">Dual Degree</option>
                    </select>
                  </label>
                  <label>
                    Any Inputs/Suggestions
                    <br />
                    <input
                      type="text"
                      name="suggestions"
                      className="text_input-member"
                      placeholder="Suggestions"
                      value={editedUser.suggestions}
                      onChange={handleInputChange}
                    />
                  </label>


                </div>
              </div>
              <br />
              <div className="member-button">
                {errorMessage !== "" ? (
                  <div className="error-message-mandatory-fields">
                    {errorMessage}
                  </div>
                ) : (
                  <p></p>
                )}
                <button type="submit" className="submit-member">
                  Join The Network
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BecomeAMember;
