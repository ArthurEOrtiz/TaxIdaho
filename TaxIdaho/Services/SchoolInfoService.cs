using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using TaxIdaho.Models;

namespace TaxIdaho.Services
{
	public class SchoolInfoService
	{
		private readonly string _connectionString;

		public SchoolInfoService(string connectionString)
		{
			_connectionString = connectionString;
		}

		public IEnumerable<SchoolInfo> GetAll()
		{
			using (IDbConnection dbConnection = new SqlConnection(_connectionString))
			{
				
				dbConnection.Open();
				
				return dbConnection.Query<SchoolInfo>("SELECT tblSchoolInfo. * FROM tblSchoolInfo order by tblSchoolInfo.SDateSchool").ToList();
			}
		}

		//public IEnumerable<SchoolInfo> GetCoursesByDateRange(DateTime startDate, DateTime endDate)
		//{
		//	using(IDbConnection dbConnection = new SqlConnection(_connectionString))
		//	{
		//		dbConnection.Open();

		//		string script = 
		//	}
		//}
	}
}
