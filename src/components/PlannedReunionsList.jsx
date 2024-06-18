import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom"; // Import Link from React Router

const PlannedReunionsList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    title: [],
    date: [],
    batch: [],
  });

  const [searchBatch, setSearchBatch] = useState('');
  
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      try {
        const Ref = collection(db, "plannedReunions");
        const Snapshot = await getDocs(Ref);
        const Data = Snapshot.docs.map((doc) => doc.data());

        setUsers(Data);

        // Reset filters to initial state
        setFilters({
          title: [],
          date: [],
          batch: [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filters, searchBatch, searchTitle]);

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
    if (searchBatch !== '') {
      filtered = filtered.filter(user => user.batch && user.batch.includes(searchBatch));
    }
    
    if (searchTitle !== '') {
      filtered = filtered.filter(user => user.title.toLowerCase().includes(searchTitle.toLowerCase()));
    }
    setFilteredUsers(filtered);
  };

  const handleSearchBatchChange = (e) => {
    const value = e.target.value;
   
      setSearchBatch(value);
    
  };

 

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
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
          <div className="absolute top-10 bg-white border rounded-md p-2 z-10">
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
          <h2 className="text-[25px] text-white border bg-indigo-700 p-2 mt-5 w-[300px] text-center mx-auto rounded-full font-bold mb-8">
            Planned Reunions
          </h2>
        </motion.div>
      </div>

      <div className="w-[1000px] flex flex-row gap-[30px]">
      <input
        type="text"
        placeholder="Search by Batch Number"
        value={searchBatch}
        onChange={handleSearchBatchChange}
        className="p-2 border-2 border-gray-700 w-[300px] rounded-md bg-slate-200 focus:outline-none mb-4"
      />
      <input
        type="text"
        placeholder="Search by Title"
        value={searchTitle}
        onChange={handleSearchTitleChange}
        className="p-2 border-2 border-gray-700 rounded-md bg-slate-200 w-[700px] focus:outline-none mb-4"
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
              <StyledTableCell style={{ width: "10%" }}>
                {" "}
                Batch{" "}
                <FilterDropdown
                  options={users.map((user) => user.batch)}
                  columnName="batch"
                />
              </StyledTableCell>
              <StyledTableCell align="right" style={{ width: "10%" }}>
                {" "}
                Date{" "}
                <FilterDropdown
                  options={users.map((user) => user.date)}
                  columnName="date"
                />
              </StyledTableCell>
              <StyledTableCell align="right" style={{ width: "10%" }}>
                {" "}
                Title{" "}
                <FilterDropdown
                  options={users.map((user) => user.title)}
                  columnName="title"
                />
              </StyledTableCell>
              <StyledTableCell align="right"> Description</StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                Registrations
              </StyledTableCell>{" "}
              {/* Add new column for Registrations */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <StyledTableRow key={index} hover sx={{ cursor: "pointer" }}>
                <StyledTableCell>{user.batch}</StyledTableCell>
                <StyledTableCell align="right">{user.date}</StyledTableCell>
                <StyledTableCell align="right">{user.title}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link
                    to={`/registrations/${user.batch}`}
                    className="text-blue-500 hover:underline"
                  >
                    Show Registrations
                  </Link>{" "}
                  {/* Link to Registrations page */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlannedReunionsList;
