namespace TaxIdaho.Models
{
	public class SchoolInfo
	{
		public int Id { get; set; }
		public string SSchoolType { get; set; } = "Something";
		public DateTime SDateSchool { get; set; }
		public int SSeq { get; set; }
		public string? SCity { get; set; } = "Something";
		public string? SLocation1 { get; set; } = "Something";
		public string? SLocation2 { get; set; } = "Something";
		public DateTime SDeadLine { get; set; } 
	}
}
