using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using BuscaPatasFinal.Controllers;

namespace BuscaPatasFinal.Controllers
{
    public class MatchmakingController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MatchmakingController(ApplicationDbContext context)
        {
            _context = context;
        }


    // Handle quiz submission
    [HttpPost]
        public IActionResult SubmitQuiz([FromBody] QuizSubmission submission)
        {
            try
            {
                if (submission == null)
                {
                    return Json(new { success = false, message = "Submission data is missing or invalid." });
                }

                // Get UserId from the session
                var userIdFromSession = HttpContext.Session.GetString("UserId");
                if (string.IsNullOrEmpty(userIdFromSession))
                {
                    return Json(new { success = false, message = "User is not logged in." });
                }

                var userId = int.Parse(userIdFromSession);

                // Check if the user exists
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user == null)
                {
                    return Json(new { success = false, message = "User not found." });
                }

                // Create and populate the QuizAttempt object
                var quizAttempt = new QuizAttempt
                {
                    UserId = userId,
                    Species = submission.Species ?? "Not Specified",
                    Pergunta1 = submission.Size != null && submission.Size.Any() ? string.Join(",", submission.Size) : "Not Specified",
                    Pergunta2 = submission.AgeRange != null && submission.AgeRange.Any() ? string.Join(",", submission.AgeRange) : "Not Specified",
                    Pergunta3 = submission.EnergyLevel ?? "Not Specified",
                    Pergunta4 = submission.Furtype ?? "Not Specified",
                    Pergunta5 = submission.Shedding ?? "Not Specified"
                };

                // Save the data to the database
                _context.QuizAttempt.Add(quizAttempt);
                _context.SaveChanges();

                return Json(new { success = true, message = "Quiz submitted successfully!" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return Json(new { success = false, message = "An error occurred while submitting the quiz." });
            }
        }




        [HttpPost]
        public IActionResult FindMatchingAnimalsWithPopup([FromBody] QuizAttempt quizAttemptData)
        {
            try
            {
                // Get the latest quiz attempt by the currently logged-in user
                var userIdFromSession = HttpContext.Session.GetString("UserId");
                if (string.IsNullOrEmpty(userIdFromSession))
                {
                    return Json(new { success = false, message = "User is not logged in." });
                }

                int userId = int.Parse(userIdFromSession);

                var latestQuizAttempt = _context.QuizAttempt
                    .Where(q => q.UserId == userId)
                    .OrderByDescending(q => q.IDQuizz)
                    .FirstOrDefault();

                if (latestQuizAttempt == null)
                {
                    return Json(new { success = false, message = "No quiz data found for the user." });
                }

                // Ensure null safety by providing default values
                string species = latestQuizAttempt?.Species ?? "0";
                string pergunta1 = latestQuizAttempt?.Pergunta1 ?? "";
                string pergunta2 = latestQuizAttempt?.Pergunta2 ?? "";
                string pergunta3 = latestQuizAttempt?.Pergunta3 ?? "";
                string pergunta4 = latestQuizAttempt?.Pergunta4 ?? "";
                string pergunta5 = latestQuizAttempt?.Pergunta5 ?? "0";

                Console.WriteLine($"Fetched Quiz Attempt: {latestQuizAttempt.IDQuizz}, Species: {species}");


                // Retrieve all animals from the database
                var animals = _context.Sheltered.ToList();
                var matchedAnimals = new List<UserMatchedAnimal>();

                foreach (var animal in animals)
                {
                    int matchScore = 0;
                    Console.WriteLine($"Comparing with Animal: {animal.AnimalName}");

                    // Species comparison
                    if (int.TryParse(species, out int speciesValue) && speciesValue == animal.IDSpecies)
                    {
                        matchScore++;
                    }

                    // Size comparison
                    if (!string.IsNullOrEmpty(pergunta1))
                    {
                        var sizeValues = pergunta1.Split(',').Select(s => s.Trim().ToLower());
                        if (sizeValues.Contains(animal.Size?.Trim().ToLower())) matchScore++;
                    }

                    // AgeRange comparison
                    if (!string.IsNullOrEmpty(pergunta2))
                    {
                        var ageRangeValues = pergunta2.Split(',').Select(s => s.Trim().ToLower());
                        if (ageRangeValues.Contains(animal.AgeRange?.Trim().ToLower())) matchScore++;
                    }

                    // Energy comparison
                    if (!string.IsNullOrEmpty(pergunta3))
                    {
                        var energyValues = pergunta3.Split(',').Select(s => s.Trim().ToLower());
                        if (energyValues.Contains(animal.Energy?.Trim().ToLower())) matchScore++;
                    }

                    // Furtype comparison
                    if (!string.IsNullOrEmpty(pergunta4))
                    {
                        var furtypeValues = pergunta4.Split(',').Select(s => s.Trim().ToLower());
                        if (furtypeValues.Contains(animal.Furtype?.Trim().ToLower())) matchScore++;
                    }

                    // Shedding comparison
                    bool quizShedding = pergunta5 == "1" || pergunta5.ToLower() == "true";
                    if ((animal.Shedding ?? false) == quizShedding) matchScore++;

                    Console.WriteLine($"Total Match Score for {animal.AnimalName}: {matchScore}");

                    if (matchScore >= 3)
                    {
                        matchedAnimals.Add(new UserMatchedAnimal
                        {
                            UserId = userId,
                            IDAnimal = animal.IDAnimal,
                            AnimalName = animal.AnimalName ?? "Unknown",
                            IDQuizz = latestQuizAttempt.IDQuizz,
                            Image = animal.Image ?? new byte[0] // Handle null images
                        });
                    }
                }

                // Use transaction to delete existing records and insert new ones
                using (var transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        // Delete existing entries for the user before inserting new ones
                        var existingMatches = _context.UserMatchedAnimals.Where(m => m.UserId == userId).ToList();
                        if (existingMatches.Any())
                        {
                            _context.UserMatchedAnimals.RemoveRange(existingMatches);
                            Console.WriteLine($"Deleted {existingMatches.Count} existing matches for UserId: {userId}");
                            _context.SaveChanges();
                        }

                        // Insert new matches if available
                        if (matchedAnimals.Any())
                        {
                            _context.UserMatchedAnimals.AddRange(matchedAnimals);
                            _context.SaveChanges();
                            Console.WriteLine($"Saved {matchedAnimals.Count} new matched animals for UserId: {userId}");
                        }       

                        transaction.Commit();


                        Console.WriteLine($"Deleted {existingMatches.Count()} existing matches for UserId: {userId}");
                        Console.WriteLine($"Saved {matchedAnimals.Count} new matched animals for UserId: {userId}");

                        // Return the newly saved matches
                        var results = matchedAnimals.Select(m => new
                        {
                            m.AnimalName,
                            Image = m.Image != null ? Convert.ToBase64String(m.Image) : null
                        }).ToList();

                        return RedirectToAction("MatchmakingPage");

                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        Console.WriteLine($"Transaction error: {ex.Message}");
                        return Json(new { success = false, message = "Error updating matched animals." });
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error finding matches: {ex.Message}");
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }

        // Display the matchmaking page with matched animals
        [HttpGet]
        public IActionResult MatchmakingPage()
        {
            var userIdFromSession = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userIdFromSession))
            {
                ViewData["Message"] = "User is not logged in.";
                return View(new List<MatchedAnimalViewModel>());
            }

            if (!int.TryParse(userIdFromSession, out int userId))
            {
                ViewData["Message"] = "Invalid user ID.";
                return View(new List<MatchedAnimalViewModel>());
            }

            var matchedAnimals = _context.UserMatchedAnimals
                .Where(m => m.UserId == userId)
                .Select(m => new MatchedAnimalViewModel
                {
                    AnimalName = m.AnimalName
                })
                .ToList();

            if (!matchedAnimals.Any())
            {
                ViewData["Message"] = "Nenhum animal correspondente encontrado.";
            }

            return View(matchedAnimals);
        }

        [HttpGet]
        public JsonResult CheckMatches()
        {
            var userIdFromSession = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userIdFromSession))
            {
                return Json(new { success = false, message = "User is not logged in." });
            }

            if (!int.TryParse(userIdFromSession, out int userId))
            {
                return Json(new { success = false, message = "Invalid user ID." });
            }

            var matchedAnimals = _context.UserMatchedAnimals
                .Where(m => m.UserId == userId)
                .Select(m => new
                {
                    IDAnimal = m.IDAnimal, // Add the animal ID
                    animalName = m.AnimalName,
                    imageBase64 = m.Image != null ? Convert.ToBase64String(m.Image) : null
                })
                .ToList();

            // Log the values to the console or application logs
            foreach (var animal in matchedAnimals)
            {
                Console.WriteLine($"Matched Animal: IDAnimal={animal.IDAnimal}, Name={animal.animalName}");
            }

            if (!matchedAnimals.Any())
            {
                return Json(new { success = false, message = "No matches yet." });
            }

            return Json(new { success = true, data = matchedAnimals });
        }

        public IActionResult AnimalList()
        {
            var userIdFromSession = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userIdFromSession))
            {
                ViewData["Message"] = "User is not logged in.";
                return View(new List<AnimalListViewModel>());
            }

            int userId = int.Parse(userIdFromSession);

            var dogs = _context.AnimalList
                .Where(a => a.IDSpecies == 1 && a.IDUser == userId) // Filter by species and user ID
                .Select(a => new AnimalListViewModel
                {
                    IDAnimal = a.IDAnimal,
                    AnimalName = a.AnimalName,
                    Image = a.Image ?? Array.Empty<byte>(),
                    IDSpecies = a.IDSpecies
                })
                .ToList();

            if (!dogs.Any())
            {
                ViewData["Message"] = "Nenhum animal correspondente encontrado.";
            }

            return View(dogs);
        }


        [HttpPost]
        public IActionResult InsertAnimalsToAnimalList()
        {
            try
            {
                var userIdFromSession = HttpContext.Session.GetString("UserId");
                if (string.IsNullOrEmpty(userIdFromSession))
                {
                    return Json(new { success = false, message = "User is not logged in." });
                }

                int userId = int.Parse(userIdFromSession);

                var matchedAnimals = _context.UserMatchedAnimals.Where(m => m.UserId == userId).ToList();

                var matchedAnimalIds = matchedAnimals.Select(a => a.IDAnimal).ToList();
                var existingAnimalIds = _context.AnimalList
                    .Where(a => matchedAnimalIds.Contains(a.IDAnimal) && a.IDUser == userId)
                    .Select(a => a.IDAnimal)
                    .ToList();

                var newAnimals = matchedAnimals
                    .Where(a => !existingAnimalIds.Contains(a.IDAnimal))
                    .Select(a => new AnimalList
                    {
                        IDUser = a.UserId,
                        IDAnimal = a.IDAnimal,
                        AnimalName = a.AnimalName,
                        Image = a.Image,
                        IDSpecies = _context.Sheltered
                            .Where(s => s.IDAnimal == a.IDAnimal)
                            .Select(s => s.IDSpecies)
                            .FirstOrDefault()
                    })
                    .ToList();

                if (newAnimals.Any())
                {
                    _context.AnimalList.AddRange(newAnimals);
                    _context.SaveChanges();
                    return Json(new { success = true, message = $"{newAnimals.Count} new animals added to AnimalList." });
                }
                else
                {
                    return Json(new { success = false, message = "No new animals to add." });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inserting animals: {ex.Message}");
                return Json(new { success = false, message = "An error occurred while inserting animals." });
            }
        }

    }
}



