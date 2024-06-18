import React, { useState } from 'react';

const TableComponent = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchTermNameEmail, setSearchTermNameEmail] = useState('');
    const [searchTermRollNo, setSearchTermRollNo] = useState('');
    const [searchTermCourse, setSearchTermCourse] = useState('');
    const [searchTermYear, setSearchTermYear] = useState('');
    const [searchTermCompany, setSearchTermCompany] = useState('');
    const [searchTermWorkExperience, setSearchTermWorkExperience] = useState('');

    const handleOption = (option) => {
        let updatedOptions = [...selectedOptions];
        if (!updatedOptions.includes(option)) {
            updatedOptions = updatedOptions.filter(item => item !== 'nameEmail' && item !== 'rollNo' && item !== 'courseYear' && item !== 'company' && item !== 'workExperience');
            updatedOptions.push(option);
        }
        setSelectedOptions(updatedOptions);
        setSearchTermNameEmail('');
        setSearchTermRollNo('');
        setSearchTermCourse('');
        setSearchTermYear('');
        setSearchTermCompany('');
        setSearchTermWorkExperience('');
    };

    const handleRowSelect = (option, value) => {
        let updatedOptions = [...selectedOptions];
        if (!updatedOptions.includes(option)) {
            updatedOptions = updatedOptions.filter(item => item !== 'nameEmail' && item !== 'rollNo' && item !== 'courseYear' && item !== 'company' && item !== 'workExperience');
            updatedOptions.push(option);
        }
        setSelectedOptions(updatedOptions);
        if (option === 'nameEmail') {
            setSearchTermNameEmail(value);
        } else if (option === 'rollNo') {
            setSearchTermRollNo(value);
        } else if (option === 'courseYear') {
            const [course, year] = value.split(' - ');
            setSearchTermCourse(course);
            setSearchTermYear(year);
        } else if (option === 'company') {
            setSearchTermCompany(value);
        } else if (option === 'workExperience') {
            setSearchTermWorkExperience(value);
        }
    };

    const tableData = [
        { id: 1, name: 'Alice', email: 'alice@example.com', rollNo: '101', course: 'Computer Science', year: 2022, company: 'Google', workExperience: '3 years' },
        { id: 2, name: 'Bob', email: 'bob@example.com', rollNo: '102', course: 'Electrical Engineering', year: 2021, company: 'Facebook', workExperience: '2 years' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', rollNo: '103', course: 'Mechanical Engineering', year: 2020, company: 'Amazon', workExperience: '4 years' },
    ];

    let filteredData = [...tableData];
    selectedOptions.forEach(option => {
        if (option === 'nameEmail') {
            filteredData = filteredData.filter(row => row.name.toLowerCase().includes(searchTermNameEmail.toLowerCase()) || row.email.toLowerCase().includes(searchTermNameEmail.toLowerCase()));
        } else if (option === 'rollNo') {
            filteredData = filteredData.filter(row => row.rollNo.toLowerCase().includes(searchTermRollNo.toLowerCase()));
        } else if (option === 'courseYear') {
            filteredData = filteredData.filter(row => row.course.toLowerCase().includes(searchTermCourse.toLowerCase()) && row.year.toString().includes(searchTermYear));
        } else if (option === 'company') {
            filteredData = filteredData.filter(row => row.company.toLowerCase().includes(searchTermCompany.toLowerCase()));
        } else if (option === 'workExperience') {
            filteredData = filteredData.filter(row => row.workExperience.toLowerCase().includes(searchTermWorkExperience.toLowerCase()));
        }
    });

    return (
        <div>
            <div className="flex space-x-4">
                <button onClick={() => handleOption('nameEmail')} className="border px-2">Name, Email</button>
                <button onClick={() => handleOption('rollNo')} className="border px-2">Roll No.</button>
                <button onClick={() => handleOption('courseYear')} className="border px-2">Course and Year</button>
                <button onClick={() => handleOption('company')} className="border px-2">Company</button>
                <button onClick={() => handleOption('workExperience')} className="border px-2">Work Experience</button>
            </div>
            {selectedOptions.includes('nameEmail') && (
                <div>
                    <input
                        type="text"
                        placeholder="Search Name or Email"
                        value={searchTermNameEmail}
                        onChange={(e) => setSearchTermNameEmail(e.target.value)}
                        className="border mt-4 px-2"
                    />
                </div>
            )}
            {selectedOptions.includes('rollNo') && (
                <div>
                    <input
                        type="text"
                        placeholder="Search Roll No."
                        value={searchTermRollNo}
                        onChange={(e) => setSearchTermRollNo(e.target.value)}
                        className="border mt-4 px-2"
                    />
                </div>
            )}
            {selectedOptions.includes('courseYear') && (
                <div>
                    <input
                        type="text"
                        placeholder="Search Course"
                        value={searchTermCourse}
                        onChange={(e) => setSearchTermCourse(e.target.value)}
                        className="border mt-4 px-2"
                    />
                    <input
                        type="text"
                        placeholder="Search Year"
                        value={searchTermYear}
                        onChange={(e) => setSearchTermYear(e.target.value)}
                        className="border mt-2 px-2"
                    />
                </div>
            )}
            {selectedOptions.includes('company') && (
                <div>
                    <input
                        type="text"
                        placeholder="Search Company"
                        value={searchTermCompany}
                        onChange={(e) => setSearchTermCompany(e.target.value)}
                        className="border mt-4 px-2"
                    />
                </div>
            )}
            {selectedOptions.includes('workExperience') && (
                <div>
                    <input
                        type="text"
                        placeholder="Search Work Experience"
                        value={searchTermWorkExperience}
                        onChange={(e) => setSearchTermWorkExperience(e.target.value)}
                        className="border mt-4 px-2"
                    />
                </div>
            )}
            <table className="mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No.</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Company</th>
                        <th>Work Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(row => (
                        <tr key={row.id} onClick={() => handleRowSelect('nameEmail', row.name)}>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.rollNo}</td>
                            <td>{row.course}</td>
                            <td>{row.year}</td>
                            <td>{row.company}</td>
                            <td>{row.workExperience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
