import React, { useState, useEffect } from 'react';
import { useErrorBoundary } from "react-error-boundary";

export const SchoolInfo = () => {
  const { showBoundary } = useErrorBoundary();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(`schoolinfo/GetByDateRange?startDate=${currentYear}-01-01&endDate=${currentYear}-12-31`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        showBoundary(error);
      }
    };

    fetchData();
  // Below is not a dev note, but rather I'm telling es-lint to ignore the next line. 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once on mount


  const renderCoursesTable = (courses) => (
    <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>School Type</th>
          <th>Date</th>
          <th>Seq</th>
          <th>City</th>
          <th>Location 1</th>
          <th>Location 2</th>
          <th>Dead Line</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>{course.sSchoolType}</td>
            <td>{course.sDateSchool}</td>
            <td>{course.sSeq}</td>
            <td>{course.sCity}</td>
            <td>{course.sLocation1}</td>
            <td>{course.sLocation2}</td>
            <td>{course.sDeadLine}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const contents = loading ? <p><em>Loading...</em></p>: renderCoursesTable(courses);

  return (
    <div>
      <h1 id="tabelLabel"> School Info </h1>
      <p>Trying to display some data of a page</p>
      {contents}
    </div>
  );
};
