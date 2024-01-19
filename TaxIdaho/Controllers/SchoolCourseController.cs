using Microsoft.AspNetCore.Mvc;
using TaxIdaho.Models;
using TaxIdaho.Services;

namespace TaxIdaho.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class SchoolCourseController : ControllerBase
	{
		public readonly ILogger<SchoolCourseController> _logger;
		public readonly SchoolCourseService _schoolCourseService;

		public SchoolCourseController(ILogger<SchoolCourseController> logger, SchoolCourseService schoolCourseService)
		{
			_logger = logger;
			_schoolCourseService = schoolCourseService;
		}

		[HttpGet]
		public IEnumerable<SchoolCourse> GetAll()
		{
			_logger.LogInformation(0, "GetAll(), Called");
			try
			{
				return _schoolCourseService.GetAll();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAll(), Exception");
				return Enumerable.Empty<SchoolCourse>();
			}
		}

		/// <summary>
		/// Retrieves a single record from tblSchoolCourses. Should throw an exception if there is a problem 
		/// </summary>
		/// <param name="schoolType">A single character <see cref="string"/> no information on this parameter is given. </param>
		/// <param name="dateSchool">A <see cref="DateTime"/> of the first day of class.</param>
		/// <param name="cSSeq">A single character <see cref="string"/>, no information on this parameter is given.</param>
		/// <returns>
		/// Single record of <see cref="SchoolCourse"/>
		/// </returns>
		[HttpGet("GetByBlendedKey")]
		public SchoolCourse GetByBlendedKey(string schoolType, DateTime dateSchool, int cSSeq)
		{
			_logger.LogInformation(0, "GetByBlendedKey({SchoolType}, {DateSchool}, {CSSeq}), Called", schoolType, dateSchool, cSSeq);

			try
			{
				return _schoolCourseService.GetByBlendedKey(schoolType, dateSchool, cSSeq);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetByBlendedKey({SchoolType}, {DateSchool}, {CSSeq})", schoolType, dateSchool, cSSeq);
				return null;
			}
		}

		[HttpGet("GetByBlendedKeyExtendedColumns")]
		public SchoolCourse GetByBlendedKeyExtendedColumns(string schoolType, DateTime dateSchool, int sSeq)
		{
			_logger.LogInformation(0, "GetByBlendedKeyExtended({SchoolType}, {DateSchool}, {SSeq}, Called", schoolType, dateSchool, sSeq);
			try
			{
				return _schoolCourseService.GetByBlendedKeyExtendedColumns(schoolType, dateSchool, sSeq);
			} 
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetByBlendedKeyExtended({SchoolType}, {DateSchool}, {SSeq}", schoolType, dateSchool, sSeq);
				return null;
			}
		}
	}
}
