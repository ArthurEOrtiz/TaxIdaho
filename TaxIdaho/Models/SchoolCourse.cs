namespace TaxIdaho.Models
{
	/// <summary>
	/// This is the model derived from the tblSchoolCourses in the ISTC database
	/// This is also written poorly and I don't know much about what all the fields mean. 
	/// I'll be filling in some notes as I go. 
	/// </summary>
	public class SchoolCourse
	{
		public DateTime CDateSchool { get; set; }
		// R = Regional,  S= Summer School, W = Winter School
		public string CSchoolType { get; set; } = string.Empty;
		public int CSSeq { get; set; }
		public int CSeq { get; set; }
		public string CName { get; set; } = string.Empty;
		public string CRoom { get; set; } = string.Empty;
		public string CDesc { get; set; } = string.Empty;
		public string CLink { get; set; } = string.Empty; // this is a link to a pdf about the course
		public string CTime { get; set; } = string.Empty;
		// if workday is and empty string, then there is not class
		// if workday is "f" then its a full date of class. 
		// if workday is "a" then its just an AM class. 
		public string CWkDay1 { get; set; } = string.Empty; // represents Sunday
		public string CWkDay2 { get; set; } = string.Empty; // represents Monday
		public string CWkDay3 { get; set; } = string.Empty; // represents Tuesday
		public string CWkDay4 { get; set; } = string.Empty; // represents Wednesday
		public string CWkDay5 { get; set; } = string.Empty; // represents Thursday
		public string CWkDay6 { get; set; } = string.Empty; // represents Friday
		public string CWkDay7 { get; set; } = string.Empty; // represents Saturday
		public string CAllow { get; set; } = string.Empty;
		public int CFullCredit { get; set; }
		public int CAttendCredit { get; set; }
		public string CPABClass { get; set; } = string.Empty;
		public string CCertType { get; set; } = string.Empty;
		public int CMaxStudents { get; set; }
		public string CPreReq { get; set; } = string.Empty;

		// Extended Columns for the GetByBlendedKeyExtendedColumns() method is called in SchoolCourseService. 
		public string SLocation1 { get; set; } = string.Empty;
		public string SLocation2 { get; set; } = string.Empty;
		public DateTime SDeadLine { get; set; }

	}
}
