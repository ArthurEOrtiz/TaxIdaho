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

		[HttpGet("GetByDateRange")]
		public IEnumerable<SchoolInfo> GetByDateRang(DateTime startDate, DateTime endDate) 
		{
			_logger.LogInformation(0, "GetByDateRange({StartDate}, {EndDate}), Called", startDate, endDate);

			try
			{
				return _schoolInfoService.GetCoursesByDateRange(startDate, endDate);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetByDateRange({StartDate}, {EndDate}), Exception", startDate, endDate);
				return Enumerable.Empty<SchoolInfo>();
			}
		}

	}
}
