using Microsoft.AspNetCore.Mvc;
using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using System.Linq;

namespace BuscaPatasFinal.Controllers
{
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetNonAdminUsers()
        {
            var nonAdminUsers = _context.Users
                .Where(u => u.Type != "Admin")
                .Select(u => new
                {
                    u.Id,
                    u.Username
                })
                .ToList();

            return Json(nonAdminUsers);
        }

        [HttpPost]
        public IActionResult MakeAdmin(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return Json(new { success = false, message = "User not found." });
            }

            user.Type = "Admin";
            _context.SaveChanges();

            return Json(new { success = true, message = "User updated to Admin." });
        }

        // Action to serve the AdminManagement Razor view
        [HttpGet]
        public IActionResult AdminManagement()
        {
            return View();
        }
    }
}
