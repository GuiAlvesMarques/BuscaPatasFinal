using BuscaPatasFinal.Data;
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult TestDatabase()
    {
        // Fetch all users from the database
        var users = _context.Users.ToList();

        // Return data as JSON to verify the connection
        return Json(users);
    }

    public IActionResult Index()
    {
        return Redirect("/index.html");
    }
}