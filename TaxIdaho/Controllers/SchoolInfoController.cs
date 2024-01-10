using Microsoft.AspNetCore.Mvc;
using TaxIdaho.Models;

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
			return Enumerable.Range(1, 4).Select(i => new SchoolInfo
			{
				Id = i,
				SSchoolType = $"School Type: {i}",
				SDateSchool = DateTime.Now.AddDays(i),
				SSeq = i,
				SCity = $"City {i}",
				SLocation1 = $"Location 1 {i}",
				SLocation2 = $"Location 2 {i}",
				SDeadLine = DateTime.Now.AddDays(i)
			})
			.ToArray();
		}

	}
}
