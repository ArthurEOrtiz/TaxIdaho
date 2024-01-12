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

		/// <summary>
		/// Retrieves all records of school information. 
		/// </summary>
		/// <returns>
		/// An <see cref="IEnumerable{T}"/> collection of <see cref="SchoolInfo"/> objects
		/// </returns>
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
		/// An <see cref="IEnumerable{T}"/> of <see cref="SchoolInfo"/> representing school 
		/// information entries that fall within the specified date range.
		/// </returns>
		public IEnumerable<SchoolInfo> GetCoursesByDateRange(DateTime startDate, DateTime endDate)
		{
			using (IDbConnection dbConnection = new SqlConnection(_connectionString))
			{
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
					dbConnection.Open();
					return dbConnection.Query<SchoolInfo>(script, new { StartDate = startDate, EndDate = endDate }).ToList();
				}
				catch (SqlException ex) 
				{
					_logger.LogError(ex, "SchoolInfoService, GetCoursesByDateRange, SQL Exception: {script}", script);
					return Enumerable.Empty<SchoolInfo>();
				}
				catch(Exception ex)
				{
					_logger.LogError(ex, "SchoolInfoService, GetCoursesByDateRange, Exception, Start Date: {startDate}, End Date: {endDate}", startDate, endDate);
					return Enumerable.Empty<SchoolInfo>();
				}
				
			}
		}
	}
}
