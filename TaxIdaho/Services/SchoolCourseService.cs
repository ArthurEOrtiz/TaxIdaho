using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using TaxIdaho.Models;

namespace TaxIdaho.Services
{
	public class SchoolCourseService
	{
		private readonly string _connectionString;
		private readonly ILogger<SchoolCourseService> _logger;

		public SchoolCourseService(ILogger<SchoolCourseService> logger, string connectionString)
		{
			_logger = logger;
			_connectionString = connectionString;
		}

		/// <summary>
		/// Retrieves all records from the tblSchoolCourses
		/// </summary>
		/// <returns>An <see cref="IEnumerable{T}"/> collection of <see cref="SchoolCourse"/></returns>
		public IEnumerable<SchoolCourse> GetAll()
		{
			using (IDbConnection dbConnection = new SqlConnection(_connectionString))
			{
				dbConnection.Open();
				return dbConnection.Query<SchoolCourse>("SELECT tblSchoolCourses.* FROM tblSchoolCourses]");
			}
		}

		public SchoolCourse GetByBlendedKey(string schoolType, DateTime dateSchool, int cSSeq)
		{
			using (IDbConnection dbConnection = new SqlConnection(_connectionString))
			{
				dbConnection.Open();
				string script = @"
						SELECT tblSchoolCourses.*
						FROM tblSchoolCourses
						WHERE cSchoolType = @SchoolType
						AND cDateSchool = @DateSchool
						AND cSSeq = @CSSeq
				";

				return dbConnection.Query<SchoolCourse>(script, new { SchoolType = schoolType, DateSchool = dateSchool, CSSeq = cSSeq }).Single();
			}
		}
	}
}
