using TaxIdaho.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var configuration = builder.Configuration;
string? connectionString = configuration.GetConnectionString("DefaultConnection");

try
{
	builder.Services.AddTransient<SchoolInfoService>(serviceProvider =>
	{
		var configuration = serviceProvider.GetRequiredService<IConfiguration>();
		return new SchoolInfoService(connectionString);
	});
}
catch (Exception ex)
{
	throw;
}

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
