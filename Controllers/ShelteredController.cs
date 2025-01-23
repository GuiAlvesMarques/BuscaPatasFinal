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
            // Validação do modelo recebido
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
                // Verifica se há uma imagem enviada e processa para salvar no banco de dados
                if (registoanimal.UploadedImage != null && registoanimal.UploadedImage.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        registoanimal.UploadedImage.CopyTo(memoryStream);
                        registoanimal.Image = memoryStream.ToArray(); // Converte a imagem para byte[]
                    }
                }

                if (registoanimal.Birthday != null)
                {
                    // Calcula a idade com base no aniversário
                    DateTime today = DateTime.Today;
                    registoanimal.Age = today.Year - registoanimal.Birthday.Value.Year;

                    // Verifica se o aniversário ainda não ocorreu neste ano
                    if (registoanimal.Birthday.Value.Date > today.AddYears(-registoanimal.Age))
                    {
                        registoanimal.Age--;
                    }
                }


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
            var query = _context.Sheltered
                .Where(a => a.IDSpecies == speciesId);
            var animals = query.ToList();


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
      
    }
}