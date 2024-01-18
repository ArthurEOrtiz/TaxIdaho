import React, { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

export const CourseDescription = () => {
  const { showBoundary } = useErrorBoundary();
  const [course, setCourse] = useState([]);
	const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    try {
      const { schoolType, dateSchool, seq } = validateAndLogCourseDetails(location.search);
      if (schoolType && dateSchool && seq) {
        fetchData(schoolType, dateSchool, seq);
      }
    } catch (error) {
      showBoundary(error);
    }
  }, []);

  const validateAndLogCourseDetails = (search) => {
    const { schoolType, dateSchool, seq } = extractVariablesFromURL(search);
    const validationErrors = validateCourseDetails(schoolType, dateSchool, seq);

    if (validationErrors.length > 1) {
      throw new Error(`${validationErrors.join(' ')}\nLink values:\nSchoolType: ${schoolType}\n DateSchool: ${dateSchool}\nSeq: ${seq}`);
      return null;
    } else {
      return { schoolType, dateSchool, seq };
    }
  };

  const extractVariablesFromURL = (search) => {
    const urlSearchParams = new URLSearchParams(search);
    return {
      schoolType: urlSearchParams.get('SSchholType'),
      dateSchool: urlSearchParams.get('SSDateSchool'),
      seq: urlSearchParams.get('SSeq'),
    };
  };

  const validateCourseDetails = (schoolType, dateSchool, seq) => {
    const validationErrors = ["There has been an error with the link."];

    if (!(schoolType && schoolType.length === 1)) {
      validationErrors.push("School type should be a single character.");
    }

    if (!(dateSchool && isValidDate(dateSchool))) {
      validationErrors.push("Date school should be a valid date in the format 'YYYY-MM-DD'.");
    }

    if (!(seq && /^\d+$/.test(seq))) {
      validationErrors.push("Seq should be a sequence of digits.");
    }

    return validationErrors;
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const fetchData = async (schoolType, dateSchool, seq) => {
    try {
      const response = await fetch(`schoolcourse/GetByBlendedKey?schoolType=${schoolType}&dateSchool=${dateSchool}&cSSeq=${seq}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch course record: ${response.status} ${response.status}`);
      }
      const data = await response.json();
      console.log('Selected Course: ', data);
      setCourse(data)
      setLoading(false);
    } catch (error) {
      showBoundary(error);
    }
  }

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderPage = (course) => (
    <div className="container mt-4">
      <h1 className="mb-4">{course.cName}</h1>

      <div className="row">
        <div className="col-md-6">
          <h2>Description</h2>
          <h4>Start Date</h4>
          <p>{formatDate(course.cDateSchool)}</p>
          <h4>Enrollment Deadline</h4>
          <p>01/25/2035</p>
          <h4>Class Time</h4>
          <p>{course.cTime}</p>
          <h4>About This Course</h4>
          <p>{course.cDesc}</p>
          <h4>Attendance Credit</h4>
          <p>{course.cAttendCredit}</p>
          <h4>Completion Credit</h4>
          <p>{course.cFullCredit}</p>
        </div>

        <div className="col-md-6">
          <h2>Location</h2>
          <h4>Address</h4>
          <p>1234 Fake Street</p>
          <p>Boise, ID, 80088</p>
          <h4>Building</h4>
          <p>Holiday Inn</p>
          <h4>Room Number</h4>
          <p>{course.cRoom}</p>
        </div>
      </div>
    </div>
  );

  const contents = loading ? <p><em>Loading Course . . . </em></p> : renderPage(course);

  return contents;
};


