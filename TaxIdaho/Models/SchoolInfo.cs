namespace TaxIdaho.Models
{
	/// <summary>
	/// Model for the tblSchoolInfo Table
	/// Who ever created the database did a pretty bad job.
	/// For starters they neglected to have a unique Id for the courses.
	/// SCity is actually the descriptive name for the course.
	/// SLocation1 is a descriptive name of the location, usually the name of a building.
	/// SLocation2 is usually the actual address of the of the course. 
	/// </summary>
	public class SchoolInfo
	{
		public string SSchoolType { get; set; } = string.Empty;
		public DateTime SDateSchool { get; set; }
		public int SSeq { get; set; }
		public string SCity { get; set; } = string.Empty;
		public string SLocation1 { get; set; } = string.Empty;
		public string SLocation2 { get; set; } = string.Empty;
		public DateTime SDeadLine { get; set; } 
	}
}
