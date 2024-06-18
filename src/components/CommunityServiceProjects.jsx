import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from "firebase/firestore";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { motion } from 'framer-motion';
import { motion } from "framer-motion";

const CommunityServiceProjectsListComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    email: [], 
    name: [],
    phone: [],
    projectName: [],
    projectDescription: [],
    location: [],
    date: [],
    duration: [],
    additionalInfo: []
  });

  const [searchNameEmail, setSearchNameEmail] = useState("");

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "Community Service Projects");
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map((doc) => doc.data());

        setUsers(usersData);

        // Reset filters to initial state
        setFilters({
            email: [], 
            name: [],
            phone: [],
            projectName: [],
            projectDescription: [],
            location: [],
            date: [],
            duration: [],
            additionalInfo: []
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filters, searchNameEmail]);

  const applyFilter = () => {
    let filtered = [...users];
    if (searchNameEmail !== "") {
      filtered = filtered.filter(
        (user) =>
          (user.name &&
            user.name.toLowerCase().includes(searchNameEmail.toLowerCase())) ||
          (user.email &&
            user.email.toLowerCase().includes(searchNameEmail.toLowerCase()))
      );
    }
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

  const handleSearchNameEmailChange = (e) => {
    setSearchNameEmail(e.target.value);
  };

  const FilterDropdown = ({ options, columnName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueOptions = [
      ...new Set(options.filter((option) => option !== "")),
    ]; // Filter out empty values

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
          className="p-1 border rounded-md  bg-gray-600 hover:bg-gray-400"
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

  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl text-white border mt-5 rounded-full bg-indigo-700 p-3 w-[600px] text-center mx-auto font-bold mb-8">
            Community Service Projects List
          </h2>
        </motion.div>
      </div>

      <div className="w-[1000px] flex flex-row gap-[30px]">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchNameEmail}
          onChange={handleSearchNameEmailChange}
          className="p-2 border-2 border-gray-700 rounded-md w-[700px] bg-slate-200 focus:outline-none mb-4"
        />
      </div>

      <TableContainer component={Paper} className="mb-[60px]">
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          className="shadow-3xl "
        >
          <TableHead>
            <TableRow hover>
              <StyledTableCell>
                {" "}
                Name{" "}
                <FilterDropdown
                  options={users.map((user) => user.name)}
                  columnName="name"
                  className="text-black"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                Email{" "}
                <FilterDropdown
                  options={users.map((user) => user.email)}
                  columnName="email"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                Phone{" "}
                <FilterDropdown
                  options={users.map((user) => user.phone)}
                  columnName="phone"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                Project Name{" "}
                <FilterDropdown
                  options={users.map((user) => user.projectName)}
                  columnName="projectName"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                Project Description{" "}
                <FilterDropdown
                  options={users.map((user) => user.projectDescription)}
                  columnName="projectDescription"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                Location{" "}
                <FilterDropdown
                  options={users.map((user) => user.location)}
                  columnName="location"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                Date{" "}
                <FilterDropdown
                  options={users.map((user) => user.date)}
                  columnName="date"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                Duration{" "}
                <FilterDropdown
                  options={users.map((user) => user.duration)}
                  columnName="duration"
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <StyledTableRow key={index} hover sx={{ cursor: "pointer" }}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.phone}</StyledTableCell>
                <StyledTableCell align="right">{user.projectName}</StyledTableCell>
                <StyledTableCell align="right">{user.projectDescription}</StyledTableCell>
                <StyledTableCell align="right">{user.location}</StyledTableCell>
                <StyledTableCell align="right">{user.date}</StyledTableCell>
                <StyledTableCell align="right">{user.duration}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CommunityServiceProjectsListComponent;
