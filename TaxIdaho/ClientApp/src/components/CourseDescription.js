import React, { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

export const CourseDescription = () => {
  const { showBoundary } = useErrorBoundary();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekDayObject, setWeekDayObject] = useState({});
  const location = useLocation();

  // Fetch the Course Data
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

  // Set the Week Day Object after the course is set. 
  useEffect(() => {
    setWeekDayObject({
      Sunday: course.cWkDay1,
      Monday: course.cWkDay2,
      Tuesday: course.cWkDay3,
      Wednesday: course.cWkDay4,
      Thursday: course.cWkDay5,
      Friday: course.cWkDay6,
      Saturday: course.cWkDay7
    });
  }, [course]);

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
      const response = await fetch(`schoolcourse/GetByBlendedKeyExtendedColumns?schoolType=${schoolType}&dateSchool=${dateSchool}&sSeq=${seq}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch course record: ${response.status} ${response.message}`);
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

  const renderWorkDayText = (cWkDay) => {
    const workDay = (cWkDay ?? "").toLowerCase();

    switch (workDay) {
      case "a":
        return <p>Morning class.</p>;
      case "p":
        return <p>Evening class.</p>;
      case "f":
        return <p>Full day of class.</p>;
      case "":
        return <p>No class.</p>;
      default:
        throw new Error(`${cWkDay} cannot be converted to a valid type. ("a", "p", "f", empty string)`);
    }
  };

  const renderWorkDayCard = (dayOfTheWeek) => {
    const formattedDay = dayOfTheWeek.charAt(0).toUpperCase() + dayOfTheWeek.slice(1).toLowerCase();
    return (
      <div className="card ratio ratio-1x1">
        <div className="card-body">
          <h6 className="card-title text-center">{formattedDay}</h6>
          {renderWorkDayText(weekDayObject[formattedDay])}
        </div>
      </div>
    );
  }

  const renderPage = (course) => (
    <div className="container">
      <h1 className="mb-4">{course.cName}</h1>

      <div className="row">
        <div className="col-md-4">
          <h5>Start Date</h5>
          <p>{formatDate(course.cDateSchool)}</p>
          <h5>Enrollment Deadline</h5>
          <p>{formatDate(course.sDeadLine)}</p>
          <h5>Class Time</h5>
          <p>{course.cTime}</p>
        </div>

        <div className="col-md-auto">
          <h5>Address</h5>
          <p>{course.sLocation2}</p>
          <h5>Building</h5>
          <p>{course.sLocation1}</p>
          <h5>Room Number</h5>
          <p>{course.cRoom}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div>
            <h4>About This Course</h4>
            <p>{course.cDesc}</p>
          </div>

          <div className="row">
            <div className="col-md-4">
              <h5>Attendance Credit</h5>
              <p>{course.cAttendCredit}</p>
            </div>
            <div className="col-md-4">
              <h5>Completion Credit</h5>
              <p>{course.cFullCredit}</p>
            </div>
          </div>

          <div className="container mt-4">
            <div className="row">
              <div className="col ps-0">
                {renderWorkDayCard("sunday")}
              </div>
              <div className="col">
                {renderWorkDayCard("monday")}
              </div>
              <div className="col">
                {renderWorkDayCard("tuesday")}
              </div>
              <div className="col">
                {renderWorkDayCard("wednesday")}
              </div>
              <div className="col">
                {renderWorkDayCard("thursday")}
              </div>
              <div className="col">
                {renderWorkDayCard("friday")}
              </div>
              <div className="col pe-0">
                {renderWorkDayCard("saturday")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const contents = loading ? <p><em>Loading Course . . . </em></p> : renderPage(course);

  return contents;
};


