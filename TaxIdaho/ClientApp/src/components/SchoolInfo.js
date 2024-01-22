import React, { useState, useEffect } from 'react';
import { useErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import './SchoolInfo.css'

export const SchoolInfo = () => {
  const { showBoundary } = useErrorBoundary();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // This is how the example was at `https://github.com/bvaughn/react-error-boundary`
  //useEffect(() => {
  //  const currentYear = new Date().getFullYear();
  //  fetch(`schoolinfo/GetByDateRange?startDate=${currentYear}-01-01&endDate=${currentYear}-12-31`).then(
  //    response => {
  //      //Set data in state and rerender.
  //      const data = response.json();
  //      setCourses(data);
  //      setLoading(false);
  //    },
  //    error => {
  //      console.log("ERRROORRR", error)
  //      showBoundary(error);
  //    }
  //  );
  //});

  useEffect(() => {
    // only fetchData when there is a start date and end date.
    if (startDate && endDate) {
      fetchData();
    }
    // Below is not a dev note, I'm telling es-lint to ignore the next line. 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]); // Empty dependency array to run the effect only once on mount
  // but when it has something in there, it will run when the 
  // value of the dependency changes.

  const fetchData = async () => {
    try {
      const response = await fetch(`schoolinfo/GetByDateRange?startDate=${startDate}&endDate=${endDate}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      //console.log('Received data:', data);
      setCourses(data);
      setLoading(false);

    } catch (error) {
      showBoundary(error);
    }
  };

  const handleStartDateChange = (event) => {
    // The user can only set the startDate to something before the endDate
    // or to anything if the endDate is not set. 
    const selectedStartDate = event.target.value;
    if (!endDate || new Date(endDate) > new Date(selectedStartDate)) {
      setStartDate(selectedStartDate);
    }
  };

  const handleEndDateChange = (event) => {
    // The user can only set the endDate to to something less than the start date
    // or when the start date isn't set yet.
    const selectedEndDate = event.target.value;
    if (!startDate || new Date(selectedEndDate) >= new Date(startDate)) {
      setEndDate(selectedEndDate);
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Helper function to turn table data into clickable link, and add styling 
  const TableData = ({ td, course }) => {

    return (
      <td>
        <Link
          to={`/course-description?SSchholType=${course.sSchoolType}&SSDateSchool=${formatDateYYYYMMDD(course.sDateSchool)}&SSeq=${course.sSeq}`}
          className="link-dark"  
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Click to see course details">
          {td}
        </Link>
      </td>
    );
  };

  const renderCoursesTable = (courses) => {
    // Sort courses base on date.
    const sortedCourses = courses.slice().sort((a, b) => new Date(a.sDateSchool) - new Date(b.sDateSchool));

    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Location</th>
            <th>Address</th>
            <th>Enrollment Dead Line</th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course, index) => (
            <tr key={index}>
              <TableData td={formatDate(course.sDateSchool)} course={course} />
              <TableData td={course.sCity} course={course} />
              <TableData td={course.sLocation1} course={course} />
              <TableData td={course.sLocation2} course={course} />
              <TableData td={formatDate(course.sDeadLine)} course={course} />
            </tr>
          ))}
        </tbody>
      </table>
    )
  };

  const contents = startDate && endDate ? (loading ? <p><em>Loading...</em></p> : renderCoursesTable(courses)) : null;

  return (
    <div>
      <h1 id="tableLabel">Property Tax Education Information</h1>
      <h2>Scheduled Classes</h2>
      <p> Select a start date and an end date to search for scheduled classes within that date range.</p>
      <div className="date-inputs">
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" value={startDate} max={endDate} onChange={handleStartDateChange} />

        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" value={endDate} min={startDate} onChange={handleEndDateChange} />
      </div>
      {contents}
    </div>
  );
};
