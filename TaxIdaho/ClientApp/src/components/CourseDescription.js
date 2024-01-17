import React, { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate, useLocation } from 'react-router-dom';

export const CourseDescription = () => {
  const { showBoundary } = useErrorBoundary();
  const [course, setCourse] = useState([]);
	const [loading, setLoading] = useState(true);
  //const navigate = useNavigate();
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

    if (validationErrors.length >= 1) {
      //logCourseDetails(schoolType, dateSchool, seq);
      return { schoolType, dateSchool, seq };
    } else {
      throw new Error(validationErrors.join(' '));
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
      validationErrors.push(dateSchool);
      validationErrors.push("Date school should be a valid date in the format 'YYYY-MM-DD'.");
    }

    if (!(seq && /^\d+$/.test(seq))) {
      validationErrors.push("Seq should be a sequence of digits.");
    }

    return validationErrors;
  };

  const logCourseDetails = (schoolType, dateSchool, seq) => {
    console.log(`School Type: ${schoolType}\n SchoolDate: ${dateSchool}\n Seq: ${seq}`);
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const fetchData = async (schoolType, dateSchool, seq) => {
    logCourseDetails(schoolType, dateSchool, seq);
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

  const renderPage = (course) => (
    <div>
      <h1>{course.cName}</h1>
    </div>
  );

  const contents = loading ? <p><em>Loading Course . . . </em></p> : renderPage(course);

  return contents;
};


