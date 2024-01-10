namespace TaxIdaho.Models
{
	/// <summary>
	/// Model for the tblSchoolInfo Table 
	/// </summary>
	public class SchoolInfo
	{
		public int Id { get; set; }
		public string SSchoolType { get; set; } = String.Empty;
		public DateTime SDateSchool { get; set; }
		public int SSeq { get; set; }
		public string? SCity { get; set; } 
		public string? SLocation1 { get; set; }
		public string? SLocation2 { get; set; } 
		public DateTime SDeadLine { get; set; } 
	}
}
