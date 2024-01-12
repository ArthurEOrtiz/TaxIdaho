using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using TaxIdaho.Models;

namespace TaxIdaho.Services
{
	public class SchoolInfoService
	{
		private readonly string _connectionString;
		private readonly ILogger<SchoolInfoService> _logger;

		public SchoolInfoService(ILogger<SchoolInfoService> logger, string connectionString)
		{
			_logger = logger;
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

		/// <summary>
		/// Retrieves a collection of school information entries within the specified date range.
		/// </summary>
		/// <param name="startDate">Start date of the range</param>
		/// <param name="endDate">End date of the range</param>
		/// <returns>
		/// A collection of <see cref="SchoolInfo"/> objects objects representing school 
		/// information entries that fall within the specified date range.
		/// </returns>
		public IEnumerable<SchoolInfo> GetCoursesByDateRange(DateTime startDate, DateTime endDate)
		{
			using (IDbConnection dbConnection = new SqlConnection(_connectionString))
			{
				dbConnection.Open();

				string script = @"
            SELECT [SSchoolType]
                ,[SDateSchool]
                ,[SSeq]
                ,[SCity]
                ,[SLocation1]
                ,[SLocation2]
                ,[SDeadline]
            FROM [ISTC].[dbo].[tblSchoolInfo]
            WHERE [SDateSchool] BETWEEN @StartDate AND @EndDate
        ";

				try
				{
					return dbConnection.Query<SchoolInfo>(script, new { StartDate = startDate, EndDate = endDate }).ToList();
				}
				catch (SqlException ex) 
				{
					_logger.LogError($"SchoolInfoService, Sql Exception: {ex.Message}");
					return Enumerable.Empty<SchoolInfo>();
				}
				catch(Exception ex)
				{
					_logger.LogError($"SchoolInfo Service, Exception; {ex.Message}");
					return Enumerable.Empty<SchoolInfo>();
				}
				
			}
		}
	}
}
