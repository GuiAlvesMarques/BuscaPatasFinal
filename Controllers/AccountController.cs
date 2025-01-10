using Microsoft.AspNetCore.Mvc;
using BuscaPatasFinal.Models;
using BuscaPatasFinal.Data;

namespace BuscaPatasFinal.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Register([FromForm] User user)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Check if email already exists
                    var existingUserByEmail = _context.Users.FirstOrDefault(u => u.Email == user.Email);
                    if (existingUserByEmail != null)
                    {
                        return Json(new { success = false, message = "This email is already registered." });
                    }

                    // Check if phone number already exists
                    var existingUserByPhone = _context.Users.FirstOrDefault(u => u.PhoneNumber == user.PhoneNumber);
                    if (existingUserByPhone != null)
                    {
                        return Json(new { success = false, message = "This phone number is already registered." });
                    }

                    var existingUserByUsername = _context.Users.FirstOrDefault(u => u.Username == user.Username);
                    if (existingUserByUsername != null)
                    {
                        return Json(new { success = false, message = "This Username is already registered." });
                    }

                    // If no duplicates, save the new user
                    _context.Users.Add(user);
                    _context.SaveChanges();

                    return Json(new { success = true, message = "User registered successfully!" });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                    return Json(new { success = false, message = "An error occurred during registration." });
                }
            }

            return Json(new { success = false, message = "Invalid registration details." });
        }
    }
}