using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using BuscaPatasFinal.ViewModels;
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
            // Combine animais da tabela Sheltered e Surrender
            var shelteredAnimals = _context.Sheltered
                .Where(a => a.IDSpecies == speciesId)
                .Select(a => new AnimalViewModel
                {
                    IDAnimal = a.IDAnimal,
                    AnimalName = a.AnimalName,
                    Breed = a.Breed,
                    Age = a.Age,
                    Size = a.Size,
                    Image = a.Image,
                    IsSurrendered = false, // Indica que é da tabela Sheltered
                    IDSpecies = a.IDSpecies // Certifica-se de que o IDSpecies está preenchido
                });

            var surrenderedAnimals = _context.Surrender
                .Where(a => a.IDSpecies == speciesId)
                .Select(a => new AnimalViewModel
                {
                    IDAnimal = a.IDAnimal,
                    AnimalName = a.AnimalName,
                    Breed = a.Breed,
                    Age = a.Age,
                    Size = a.Size,
                    Image = a.Image,
                    IsSurrendered = true, // Indica que é da tabela Surrender
                    IDSpecies = a.IDSpecies // Certifica-se de que o IDSpecies está preenchido
                });


            // Combine os resultados de ambas as tabelas
            var combinedAnimals = shelteredAnimals
                .Union(surrenderedAnimals)
                .ToList();

            // Determina a view com base na espécie
            string viewName = speciesId == 1 ? "~/Views/Adotar/Caes.cshtml" : "~/Views/Adotar/Gatos.cshtml";

            // Retorna a view com os animais combinados
            return View(viewName, combinedAnimals);
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

                return RedirectToAction("AdoptionList", new { speciesId = surrender.IDSpecies });
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

                if (surrender.Birthday != null)
                {
                    // Calcula a idade com base no aniversário
                    DateTime today = DateTime.Today;
                    surrender.Age = today.Year - surrender.Birthday.Value.Year;

                    // Verifica se o aniversário ainda não ocorreu neste ano
                    if (surrender.Birthday.Value.Date > today.AddYears(-surrender.Age))
                    {
                        surrender.Age--;
                    }
                }

                else
                {
                    return Json(new { success = false, message = "Imagem é Necessária" });
                }

                // Save the surrender data to the database
                _context.Surrender.Add(surrender); // Ensure "Surrender" matches your DbSet name
                _context.SaveChanges();

                return RedirectToAction("AdoptionList", new { speciesId = surrender.IDSpecies });
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

        [HttpGet]
        public IActionResult DetailsSurrender(int id)
        {
            // Busca o animal na base de dados usando o campo IDAnimal
            var animal = _context.Surrender.FirstOrDefault(a => a.IDAnimal == id);
            if (animal == null)
            {
                return NotFound(); // Retorna uma página 404 caso o animal não exista
            }

            // Retorna a View com o animal encontrado
            return View("~/Views/Adotar/DetailsSurrender.cshtml", animal);
        }

        [HttpGet]
        public IActionResult GetSuggestions()
        {
            var suggestions = new
            {
                NewEntries = _context.Sheltered
                                     .OrderByDescending(a => a.arrival_Date)
                                     .Take(5)
                                     .Select(a => new { a.IDAnimal, a.AnimalName, a.Image })
                                     .ToList(),
                Oldest = _context.Sheltered
                                 .OrderBy(a => a.Age)
                                 .Take(5)
                                 .Select(a => new { a.IDAnimal, a.AnimalName, a.Image })
                                 .ToList(),
                Youngest = _context.Sheltered
                                   .OrderByDescending(a => a.Birthday)
                                   .Take(5)
                                   .Select(a => new { a.IDAnimal, a.AnimalName, a.Image })
                                   .ToList()
            };

            return Json(suggestions);
        }
    }
}