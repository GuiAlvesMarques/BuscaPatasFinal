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

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return Json(new { success = false, message = "Email e senha são obrigatórios." });
            }

            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Email == email);
                if (user == null || user.Password != password)
                {
                    return Json(new { success = false, message = "Credenciais inválidas. Por favor, tente novamente." });
                }

                // Save user data in session
                HttpContext.Session.SetString("UserId", user.Id.ToString());
                HttpContext.Session.SetString("Email", user.Email);
                HttpContext.Session.SetString("Username", user.Username);
                HttpContext.Session.SetString("PhoneNumber", user.PhoneNumber);
                HttpContext.Session.SetString("Type", user.Type);

                return Json(new { success = true, message = "Login efetuado com sucesso!" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return Json(new { error = $"Error: {ex.Message}" });
            }
        }

        // Utility method to verify a hashed password
        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            // Replace this with your actual password hashing mechanism (e.g., BCrypt or PBKDF2)
            return enteredPassword == storedHash; // Simplified for demonstration
        }

        [HttpGet]
        public IActionResult Logout()
        {
            // Clear session data
            HttpContext.Session.Clear();

            // Redirect to login page
            return RedirectToAction("Index", "Home");
        }

        public IActionResult UserProfile()
        {
            var userId = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userId))
            {
                // Usuário não está logado, redirecione para a página de login
                return RedirectToAction("Index", "Home");
            }

            ViewBag.UserId = userId; // Pass UserId to the frontend
            ViewBag.UserName = HttpContext.Session.GetString("Username") ?? "Unknown User";
            ViewBag.UserEmail = HttpContext.Session.GetString("Email") ?? "No Email";
            ViewBag.UserPhone = HttpContext.Session.GetString("PhoneNumber") ?? "No Phone";

            return View();
        }

        [HttpGet]
        public IActionResult IsLoggedIn()
        {
            var userId = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userId))
            {
                return Json(new { isLoggedIn = false });
            }

            // Retrieve the user type from the session
            var userType = HttpContext.Session.GetString("Type");
            if (string.IsNullOrEmpty(userType))
            {
                // If user type is not set in the session, fetch it from the database
                userType = _context.Users
                    .Where(u => u.Id == int.Parse(userId))
                    .Select(u => u.Type)
                    .FirstOrDefault();
                HttpContext.Session.SetString("Type", userType); // Cache it in the session
            }

            var username = HttpContext.Session.GetString("Username");
            return Json(new { isLoggedIn = true, username, userType });
        }


    }
}