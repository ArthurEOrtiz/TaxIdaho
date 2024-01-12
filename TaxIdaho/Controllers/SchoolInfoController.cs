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
		public IEnumerable<SchoolInfo> Get()
		{

			_logger.LogInformation( "SchoolInfoController: Get Called.");


			try
			{
				return _schoolInfoService.GetAll();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.ToString());
				if (ex.InnerException != null)
				{
					_logger.LogError(ex.InnerException.Message);
				}

				return Array.Empty<SchoolInfo>();
			}

		}

	}
}
