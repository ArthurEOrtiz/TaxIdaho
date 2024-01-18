using Microsoft.Extensions.Options;
using TaxIdaho.Configuration;
using TaxIdaho.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

//Configure options using the options pattern 
builder.Services.Configure<SqlServerOptions>(builder.Configuration.GetSection("ConnectionStrings"));

// Register SchoolInfoService with options
builder.Services.AddTransient<SchoolInfoService>(serviceProvider => 
{
	SqlServerOptions options = serviceProvider.GetRequiredService<IOptions<SqlServerOptions>>().Value;
	ILogger<SchoolInfoService> logger = serviceProvider.GetRequiredService<ILogger<SchoolInfoService>>();
	return new SchoolInfoService(logger, options.DefaultConnection);
});

// Register SchoolCourseService with options.
builder.Services.AddTransient<SchoolCourseService>(serviceProvider =>
{
	SqlServerOptions options = serviceProvider.GetRequiredService<IOptions<SqlServerOptions>>().Value;
	ILogger<SchoolCourseService> logger = serviceProvider.GetRequiredService<ILogger<SchoolCourseService>>();
	return new SchoolCourseService(logger, options.DefaultConnection);
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
} 

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
		name: "default",
		pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
