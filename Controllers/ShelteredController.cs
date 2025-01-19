using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuscaPatasFinal.Controllers
{
    public class ShelteredController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ShelteredController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: Register a new sheltered animal
        [HttpPost]
        public IActionResult RegisterSheltered([FromForm] Sheltered registoanimal)
        {
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

                // Salva os dados no banco de dados
                _context.Sheltered.Add(registoanimal);
                _context.SaveChanges();

                return RedirectToAction("AdoptionList", new { speciesId = registoanimal.IDSpecies });
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

        [HttpGet]
        public IActionResult AdoptionList(int speciesId)
        {
            // Retrieve animals based on the species ID
            var animals = _context.Sheltered
                .Where(a => a.IDSpecies == speciesId) // Filter by species ID
                .ToList();

            // Verify if there are results; if not, initialize an empty list
            if (animals == null || !animals.Any())
            {
                animals = new List<Sheltered>();
            }

            // Determine the view based on the species
            string viewName = speciesId == 1 ? "~/Views/Adotar/Caes.cshtml" : "~/Views/Adotar/Gatos.cshtml";

            // Return the appropriate view with the list of animals
            return View(viewName, animals);
        }
        [HttpGet]
        public IActionResult Details(int id)
        {
            // Busca o animal na base de dados usando o campo IDAnimal
            var animal = _context.Sheltered.FirstOrDefault(a => a.IDAnimal == id);
            if (animal == null)
            {
                return NotFound(); // Retorna uma página 404 caso o animal não exista
            }

            // Verifica se o usuário está logado
            var userId = HttpContext.Session.GetString("UserId");
            bool userLiked = false;

            if (!string.IsNullOrEmpty(userId))
            {
                int parsedUserId = int.Parse(userId);

                // Verifica se o usuário curtiu o animal
                userLiked = _context.Likes.Any(l => l.IDUser == parsedUserId && l.IDAnimal == id);
            }

            // Adiciona a informação sobre curtidas ao ViewData
            ViewData["UserLiked"] = userLiked;

            // Retorna a View com o animal encontrado
            return View("~/Views/Adotar/Details.cshtml", animal);
        }

        [HttpPost]
        [Route("Sheltered/SubmitSurrender")]
        public IActionResult SubmitSurrender([FromForm] Surrender surrender)
        {
            if (!ModelState.IsValid)
            {
                // Log ModelState validation errors for debugging
                foreach (var key in ModelState.Keys)
                {
                    var errors = ModelState[key].Errors;
                    foreach (var error in errors)
                    {
                        Console.WriteLine($"Field: {key}, Error: {error.ErrorMessage}");
                    }
                }
                return Json(new { success = false, message = "Tipo de mensagem inválida", details = ModelState });
            }

            try
            {
                // Process the uploaded image
                if (surrender.UploadedImage != null && surrender.UploadedImage.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        surrender.UploadedImage.CopyTo(memoryStream);
                        surrender.Image = memoryStream.ToArray(); // Convert the image to byte[]
                    }
                }
                else
                {
                    return Json(new { success = false, message = "Imagem é Necessária" });
                }

                // Save the surrender data to the database
                _context.Surrender.Add(surrender); // Ensure "Surrender" matches your DbSet name
                _context.SaveChanges();

                return Json(new { success = true, message = "Animal Submmetido para Entrega Animal com Sucesso" });
            }
            catch (Exception ex)
            {
                // Log the error details
                Console.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }

                return Json(new
                {
                    success = false,
                    message = $"Database error: {ex.Message}",
                    innerException = ex.InnerException?.Message
                });
            }
        }
    }
}
