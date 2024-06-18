import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have firebase.js setup correctly
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as XLSX from 'xlsx'; // Importing XLSX for exporting to Excel

const RegistrationsPage = () => {
    const { batch } = useParams(); // Get the id and batch parameters from the URL
    const [registrations, setRegistrations] = useState([]);

    // Fetch registrations data based on the batch
    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const colRef = collection(db, "plannedReunions");
                const q = query(colRef, where("batch", "==", batch));
                const querySnapshot = await getDocs(q);
                const registrationData = querySnapshot.docs.map((doc) => doc.data());
                setRegistrations(registrationData[0].registeredCandidates);
            } catch (error) {
                console.error("Error fetching registrations:", error);
            }
        };

        fetchRegistrations();
    }, [batch]);

    // Styled components
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

    // Function to export registrations data to Excel
    // Function to export registrations data to Excel
    const exportToExcel = () => {
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(registrations);

      // Create a workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

      // Generate the Excel file as a binary string
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Create a blob from the binary string
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      // Create a link element and set the URL to the blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Set the download attribute of the link element to the desired file name
      const fileName = `Registrations for Reunion ${batch}.xlsx`;
      link.href = url;
      link.setAttribute('download', fileName);

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };


    return (
        <div className="container mx-auto px-8">
            <div className="flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-[25px] text-white border bg-indigo-700 p-2 px-4 mt-5 w-full text-center mx-auto rounded-full font-bold mb-8">
                        Registrations for Reunion {batch}
                    </h2>
                </motion.div>
            </div>
            <TableContainer component={Paper} className="mb-[60px]">
                <Table
                    sx={{ minWidth: 700 }}
                    aria-label="customized table"
                    className="shadow-3xl"
                >
                    <TableHead>
                        <TableRow hover>
                            <StyledTableCell align="right">S. No.</StyledTableCell> {/* Index column */}
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Entry No</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registrations.map((registration, index) => (
                            <StyledTableRow hover key={index} sx={{ cursor: "pointer" }}>
                                <StyledTableCell align="right">{index + 1}</StyledTableCell>
                                <StyledTableCell align="right">{registration.name}</StyledTableCell>
                                <StyledTableCell align="right">{registration.email}</StyledTableCell>
                                <StyledTableCell align="right">{registration.entryNo}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Add a download button below the table */}
            <button
                style={{
                    display: 'block',
                    margin: '20px auto', // Centers the button
                    padding: '10px 20px',
                    backgroundColor: '#007bff', // Blue background color
                    color: '#fff',
                    borderRadius: '12px', // Rounded corners
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
                onClick={exportToExcel}
            >
                Download Excel
            </button>
        </div>
    );
};

export default RegistrationsPage;
