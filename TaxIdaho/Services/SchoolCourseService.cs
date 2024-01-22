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

		public IEnumerable<SchoolCourse> GetByBlendedKey(string schoolType, DateTime dateSchool, int cSSeq)
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

				return dbConnection.Query<SchoolCourse>(script, new { SchoolType = schoolType, DateSchool = dateSchool, CSSeq = cSSeq });
			}
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="schoolType"></param>
		/// <param name="dateSchool"></param>
		/// <param name="cSSeq"></param>
		/// <returns></returns>
		public IEnumerable<SchoolCourse> GetByBlendedKeyExtendedColumns(string schoolType, DateTime dateSchool, int sSeq)
		{
			using (IDbConnection dbConnection = new SqlConnection(_connectionString))
			{
				dbConnection.Open();
				string script = @"
					SELECT
							ds.*,
							st.SLocation1,
							st.SLocation2,
							st.SDeadline
					FROM
							tblSchoolInfo st
					RIGHT OUTER JOIN
							tblSchoolCourses ds ON ds.cDateSchool = st.SDateSchool
											AND ds.cSchoolType = st.SSchoolType
											AND ds.cSSeq = st.SSeq
					WHERE
							st.SSchoolType = @SchoolType
							AND st.SDateSchool = @DateSchool
							AND st.SSeq = @SSeq;
				";

				return dbConnection.Query<SchoolCourse>(script, new { SchoolType = schoolType, DateSchool = dateSchool, SSeq = sSeq }).AsEnumerable();
			}
		}

		public int CountByBlendedKeyExtendedColumns(string schoolType, DateTime dateSchool, int sSeq)
		{
			using (IDbConnection dbConnection = new SqlConnection(_connectionString))
			{
				dbConnection.Open();
				string script = @"
					SELECT COUNT(*) AS RecordCount
					FROM tblSchoolInfo st
					RIGHT OUTER JOIN tblSchoolCourses ds
							ON ds.cDateSchool = st.SDateSchool
							AND ds.cSchoolType = st.SSchoolType
							AND ds.cSSeq = st.SSeq
					WHERE
							st.SSchoolType = @SchoolType
							AND st.SDateSchool = @DateSchool
							AND st.SSeq = @SSeq;
				";

				var parameters = new
				{
					SchoolType = schoolType,
					DateSchool = dateSchool,
					SSeq = sSeq
				};

				return dbConnection.QueryFirstOrDefault<int>(script, parameters);
			}
		}
	}
}
