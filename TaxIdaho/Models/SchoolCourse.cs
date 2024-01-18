namespace TaxIdaho.Models
{
	/// <summary>
	/// This is the model derived from the tblSchoolCourses in the ISTC database
	/// This is also written poorly and I don't know much about what all the fields mean. 
	/// </summary>
	public class SchoolCourse
	{
		public DateTime CDateSchool {  get; set; }
		public string CSchoolType { get; set; } = string.Empty;
		public int CSSeq { get; set; } 
		public int CSeq { get; set; } 
		public string CName { get; set; } = string.Empty;
		public string CRoom { get; set; } = string.Empty;
		public string CDesc { get; set; } = string.Empty;
		public string CLink { get; set; } = string.Empty; // this is a link to a pdf about the course
		public string CTime { get; set; } = string.Empty;
		public string CWkDay1 { get; set; } = string.Empty;
		public string CWkDay2 { get; set; } = string.Empty;
		public string CWkDay3 { get; set; } = string.Empty;
		public string CWkDay4 { get; set; } = string.Empty;
		public string CWkDay5 { get; set; } = string.Empty;
		public string CWkDay6 { get; set; } = string.Empty;
		public string CWkDay7 { get; set; } = string.Empty;
		public string CAllow { get; set; } = string.Empty;
		public int CFullCredit { get; set; }
		public int CAttendCredit {  get; set; }
		public string CPABClass { get; set; } = string.Empty;
		public string CCertType { get; set; } = string.Empty;
		public int CMaxStudents { get; set; }
		public string CPreReq { get; set; } = string.Empty;
		// Adding some rows from SchoolInfo, because these data tables are awful
		public string Location1 { get; set; } = string.Empty;
		public string Location2 { get; set; } = string.Empty;
		public DateTime SDeadLine { get; set; }	

	}
}
