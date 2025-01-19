using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BuscaPatasFinal.Controllers
{
    public class ShelterController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ShelterController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult RegisterShelter([FromForm] Shelter shelter)
        {
            if (!ModelState.IsValid)
            {
                foreach (var key in ModelState.Keys)
                {
                    var errors = ModelState[key].Errors;
                    foreach (var error in errors)
                    {
                        Console.WriteLine($"Erro no campo '{key}': {error.ErrorMessage}");
                    }
                }
                return BadRequest(new { error = "Invalid data received", details = ModelState });
            }

            try
            {
                // Verifica e processa o upload da imagem
                if (shelter.UploadedImage != null && shelter.UploadedImage.Length > 0)
                {
                    if (shelter.UploadedImage.ContentType.StartsWith("image/"))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            shelter.UploadedImage.CopyTo(memoryStream);
                            shelter.Logo = memoryStream.ToArray();
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("UploadedImage", "O arquivo enviado não é uma imagem válida.");
                        return BadRequest(new { error = "Invalid file type", details = ModelState });
                    }
                }

                // Salva o abrigo no banco de dados
                _context.Shelter.Add(shelter);
                _context.SaveChanges();

                return RedirectToAction("Details", "Shelter", new { id = shelter.IDShelter });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao salvar o abrigo: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { error = "Erro interno do servidor", details = ex.Message });
            }
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