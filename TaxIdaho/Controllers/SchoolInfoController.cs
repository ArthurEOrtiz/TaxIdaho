using Microsoft.AspNetCore.Mvc;
using TaxIdaho.Models;
using TaxIdaho.Services;

namespace TaxIdaho.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class SchoolInfoController : ControllerBase
	{
		private readonly ILogger<SchoolInfoController> _logger;
		private readonly SchoolInfoService _schoolInfoService;

		public SchoolInfoController(ILogger<SchoolInfoController> logger, SchoolInfoService schoolInfoService)
		{
			_logger = logger;
			_schoolInfoService = schoolInfoService;
		}

		[HttpGet]
		public IEnumerable<SchoolInfo> GetAll()
		{

			_logger.LogInformation(0, "GetAll(), Called");

			try
			{
				return _schoolInfoService.GetAll();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAll(), Exception");
				return Enumerable.Empty<SchoolInfo>();
			}
		}

		/// <summary>
		/// Retrieves a collection of school information entries within the specified date range.
		/// </summary>
		/// <param name="startDate">A start <see cref="DateTime"/> of the range </param>
		/// <param name="endDate">A end <see cref="DateTime"/>of the rang</param>
		/// <returns>
		/// An <see cref="IEnumerable{T}"/> of <see cref="SchoolInfo"/> representing school 
		/// information entries that fall within the specified date range.
		/// </returns>
		[HttpGet("GetByDateRange")]
		public IEnumerable<SchoolInfo> GetByDateRang(DateTime startDate, DateTime endDate) 
		{
			_logger.LogInformation(0, "GetByDateRange({StartDate}, {EndDate}), Called", startDate, endDate);

			try
			{
				IEnumerable<SchoolInfo> data = _schoolInfoService.GetCoursesByDateRange(startDate, endDate);
				return (IEnumerable<SchoolInfo>)Ok(data);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetByDateRange({StartDate}, {EndDate})", startDate, endDate);
				return (IEnumerable<SchoolInfo>)StatusCode(500, Enumerable.Empty<SchoolInfo>());
			}
		}

	}
}
