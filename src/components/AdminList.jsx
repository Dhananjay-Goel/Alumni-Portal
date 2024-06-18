import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { auth, db } from "../firebase.js";
import {
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
// import SidebarProfile from "./SidebarProfile"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";
import ApprovalUpdatePopUp from "./ApprovalUpdatePopup2";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const SmoothTransitionOption = ({ text, isSelected, onClick }) => {
  return (
    <motion.p
      className="w-[250px] h-[35px] flex items-center justify-center cursor-pointer"
      whileHover={{
        backgroundColor: isSelected ? "#4f46e5" : "#2563eb",
        color: "#fff",
        borderRadius: "9999px",
      }}
      onClick={onClick}
    >
      {text}
    </motion.p>
  );
};
const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState({ show: false, email: null });

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    email: [],
    approved: [],
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

let errorMessage = "";
const notifySuccess = (message) => {
    toast.success(message, toastOptions);
};

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      try {
        const adminRef = collection(db, "admin");
        const adminSnapshot = await getDocs(adminRef);
        const admindata = adminSnapshot.docs.map((doc) => doc.data());

        setUsers(admindata);

        // Reset filters to initial state
        setFilters({
          email: [],
          approved: [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filters]);

  const applyFilter = () => {
    let filtered = [...users];
    Object.keys(filters).forEach((key) => {
      const selectedFilters = filters[key];
      if (selectedFilters.length > 0) {
        filtered = filtered.filter((user) =>
          selectedFilters.includes(user[key])
        );
      }
    });
    setFilteredUsers(filtered);
  };

  const FilterDropdown = ({ options, columnName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueOptions = [...new Set(options)]; // Filter out duplicates

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleFilterChange = (e) => {
      const { value, checked } = e.target;
      const newFilters = checked
        ? [...filters[columnName], value]
        : filters[columnName].filter((filter) => filter !== value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        [columnName]: newFilters,
      }));
    };

    return (
      <div className="relative inline ml-2">
        <button
          className="p-1 border rounded-md bg-gray-600 hover:bg-gray-400"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.293 4.293a1 1 0 0 1 1.414 0L9 9.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414zM9 11a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute top-10 bg-white border rounded-md p-2">
            {uniqueOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2"
                style={{ color: "black" }}
              >
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleFilterChange}
                  checked={filters[columnName].includes(option)}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& td, & th": {
      border: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.background.slate300, // Change this to the desired hover color
    },
  }));

  // Function to convert boolean value to text
  const getStatusText = (approved) => {
    return approved ? "Approved" : "Pending";
  };

  const getStatusButton = (approved, email) => {
    const handleDenyApproval = async () => {
      try {
        const colRef = collection(db, "admin");
        console.log(colRef);
        const q = query(colRef, where("email", "==", email));
        const snapshot = await getDocs(q);
        console.log(snapshot);
        if (snapshot.size > 0) {
            const doc = snapshot.docs[0];
            await deleteDoc(doc.ref);
            notifySuccess("Application Denied!")
            console.log('Form submitted:');
    
    
            // Reload the page
            window.location.reload();
        } else {
            console.error("No document found with email:", email);
        }
      } catch (error) {
        console.error("Error denying approval:", error);
        alert("Failed to deny approval. Please try again later.");
      }
    };

    if (approved) {
      return (
        <button className="button bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3 flex items-center justify-center">
          <span className="mr-2">✅</span>
          Approved
        </button>
      );
    } else {
      return (
        <div className="flex items-center">
          <button
            className="button bg-red-500 hover:bg-green-500 text-white rounded-full px-6 py-3 flex items-center justify-center"
            onClick={() => setShowPopup({ show: true, email: email })}
          >
            <span className="mr-2">⏳</span>
            Pending Approval
          </button>
          <div style={{ width: '10px' }}></div> {/* Add gap */}
          <button
            className="button bg-red-500 hover:bg-green-500 text-white rounded-full px-6 py-3 flex items-center justify-center"
            onClick={handleDenyApproval}
          >
            <span className="mr-2">❌</span>
            Deny Approval
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-row gap-[80px]">
      {/* <SidebarProfile /> */}
      <div className="flex flex-col gap-[15px] container mx-auto ">
        <div className="container mx-auto px-8">
            <>
              <div className="flex justify-center pt-6">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-[25px] text-white border rounded-full bg-indigo-700 p-2 w-[300px]  mx-auto text-center font-bold mb-8">
                    Registered Admin List
                  </h2>
                </motion.div>
              </div>

              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                  className="shadow-3xl"
                >
                  <TableHead>
                    <TableRow hover>
                      <StyledTableCell align="right">
                        Email{" "}
                        <FilterDropdown
                          options={users.map((user) => user.email)}
                          columnName="email"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Approval Status{" "}
                        <FilterDropdown
                          options={users.map((user) =>
                            getStatusText(user.approved)
                          )}
                          columnName="approved"
                        />
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <StyledTableRow
                        key={index}
                        hover
                        sx={{ cursor: "pointer" }}
                      >
                        <StyledTableCell align="right">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {getStatusButton(user.approved, user.email)}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {showPopup.show && (
                <ApprovalUpdatePopUp
                  email={showPopup.email}
                  newApprovalStatus={true}
                  handleClose={() => {
                    setShowPopup({ show: false, email: null });
                    window.location.reload(); // Reload the page
                  }}
                />
              )}
            </>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserListComponent;
