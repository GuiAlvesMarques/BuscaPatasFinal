using BuscaPatasFinal.Data;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.AddConsole(); // Ensures logging is added

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add the DbContext with MySQL configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21))));

// Add session services
builder.Services.AddDistributedMemoryCache(); // Required for session
builder.Services.AddHttpContextAccessor();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts(); // Enforces HTTPS in production
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Use session middleware
app.UseSession();

app.UseAuthorization();

app.MapControllers(); // Ensures API routes are mapped if you are using controllers
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html"); // Ensures the fallback file is served for SPA

// Check database connection and log results
try
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    using (var connection = new MySqlConnection(connectionString))
    {
        connection.Open();
        app.Logger.LogInformation("Database connection successful!");
    }
}
catch (Exception ex)
{
    app.Logger.LogError($"Database connection failed: {ex.Message}");
}

app.Run();