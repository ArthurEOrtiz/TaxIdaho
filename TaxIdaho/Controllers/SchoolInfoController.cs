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

		public SchoolInfoController(ILogger<SchoolInfoController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public IEnumerable<SchoolInfo> Get()
		{

			_logger.Log(LogLevel.Information, "SchoolInfoController: Get Called.");
		
			var schoolInfoService = new SchoolInfoService(connectionString);

			try
			{
				return schoolInfoService.GetAll();
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
				if (ex.InnerException != null)
				{
					Console.WriteLine(ex.InnerException.Message);
				}

				return Enumerable.Empty<SchoolInfo>();
			}

		}

	}
}
