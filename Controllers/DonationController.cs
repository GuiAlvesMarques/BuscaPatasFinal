using Microsoft.AspNetCore.Mvc;
using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using System;
using System.IO;
using System.Linq;

namespace BuscaPatasFinal.Controllers
{
    public class DonationController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DonationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult RegisterDonation([FromForm] Donation donation)
        {
            // Validate the model received
            if (!ModelState.IsValid)
            {
                foreach (var key in ModelState.Keys)
                {
                    var errors = ModelState[key].Errors;
                    foreach (var error in errors)
                    {
                        Console.WriteLine($"Field: {key}, Error: {error.ErrorMessage}");
                    }
                }
                return Json(new { error = "Invalid data received", details = ModelState });
            }

            try
            {
                // Check if a valid donation amount was provided
                if (string.IsNullOrWhiteSpace(donation.DonationAmount))
                {
                    return Json(new { error = "Please enter a valid donation amount." });
                }

                // Check if a shelter was provided
                if (string.IsNullOrWhiteSpace(donation.NomeShelter))
                {
                    return Json(new { error = "Please select a shelter." });
                }

                // Save donation to the database
                _context.Donations.Add(donation);
                _context.SaveChanges();

                return Json(new { success = true, message = "Thank you for your donation!" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }

                return Json(new
                {
                    error = $"Database error: {ex.Message}",
                    innerException = ex.InnerException?.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }
    }
}