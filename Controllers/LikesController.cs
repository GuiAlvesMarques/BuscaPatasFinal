using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuscaPatasFinal.Controllers
{
    [Route("[controller]/[action]")]
    public class LikesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public LikesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddLike(int speciesId, int animalId)
        {
            // Verifica se o usuário está logado
            var userId = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { success = false, message = "Você precisa estar logado para dar like." });
            }

            // Converte o userId da sessão para inteiro
            int parsedUserId = int.Parse(userId);

            // Verifica se o like já existe
            Console.WriteLine($"Received speciesId: {speciesId}, animalId: {animalId}, userId: {parsedUserId}");

            var existingLike = _context.Likes.FirstOrDefault(l => l.IDUser == parsedUserId
                                                                && l.IDSpecies == speciesId
                                                                && l.IDAnimal == animalId);

            if (existingLike != null)
            {
                return Json(new { success = false, message = "Você já curtiu este animal." });
            }

            // Cria um novo like
            var like = new Like
            {
                IDUser = parsedUserId,
                IDSpecies = speciesId,
                IDAnimal = animalId
            };

            try
            {
                _context.Likes.Add(like);
                _context.SaveChanges();

                return Json(new { success = true, message = "Animal adicionado aos favoritos." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao salvar like: {ex.Message}");
                return StatusCode(500, new { success = false, message = "Ocorreu um erro ao salvar o like." });
            }
        }

        [HttpPost]
        public IActionResult RemoveLike(int speciesId, int animalId)
        {
            try
            {
                // Verifica se o usuário está logado
                var userId = HttpContext.Session.GetString("UserId");
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { success = false, message = "Você precisa estar logado para remover um like." });
                }

                // Converte o userId da sessão para inteiro
                if (!int.TryParse(userId, out int parsedUserId))
                {
                    return BadRequest(new { success = false, message = "ID do usuário inválido." });
                }

                // Busca o like existente no banco de dados
                var existingLike = _context.Likes.FirstOrDefault(l =>
                    l.IDUser == parsedUserId &&
                    l.IDSpecies == speciesId &&
                    l.IDAnimal == animalId);

                // Verifica se o like existe
                if (existingLike == null)
                {
                    return Json(new { success = false, message = "Este animal não está nos seus favoritos." });
                }

                // Remove o like e salva as mudanças
                _context.Likes.Remove(existingLike);
                _context.SaveChanges();

                return Json(new { success = true, message = "Animal removido dos favoritos com sucesso." });
            }
            catch (Exception ex)
            {
                // Loga o erro para depuração
                Console.WriteLine($"Erro ao remover o like: {ex.Message}");
                return StatusCode(500, new { success = false, message = "Ocorreu um erro ao tentar remover o animal dos favoritos." });
            }
        }


        [HttpGet]
        public IActionResult GetLikes()
        {
            // Verifica se o usuário está logado
            var userId = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { success = false, message = "Precisa estar logado para visualizar seus favoritos." });
            }

            // Converte o userId da sessão para inteiro
            int parsedUserId = int.Parse(userId);

            // Busca os likes do usuário
            var userLikes = _context.Likes.Where(l => l.IDUser == parsedUserId).ToList();

            return Json(new { success = true, likes = userLikes });
        }

        [HttpGet]
        public IActionResult GetUserFavorites()
        {
            // Verifica se o usuário está logado
            var userId = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userId))
            {
                TempData["Warning"] = "Você precisa estar logado para acessar os favoritos.";
                return RedirectToAction("Index", "Home");
            }

            int parsedUserId = int.Parse(userId);

            // Busca os favoritos do usuário
            var userFavorites = from like in _context.Likes
                                join sheltered in _context.Sheltered
                                on like.IDAnimal equals sheltered.IDAnimal
                                where like.IDUser == parsedUserId
                                select new
                                {
                                    IDAnimal = sheltered.IDAnimal,
                                    AnimalName = sheltered.AnimalName ?? "Nome desconhecido",
                                    Breed = sheltered.Breed ?? "Raça desconhecida",
                                    AgeRange = sheltered.AgeRange ?? "Desconhecida",
                                    Location = sheltered.Location ?? "Não informado",
                                    Image = sheltered.Image != null ? Convert.ToBase64String(sheltered.Image) : null // Para exibir imagens
                                };

            return Json(new { success = true, favorites = userFavorites.ToList() });
        }

        [HttpGet]
        public IActionResult Favorites()
        {
            var userId = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userId))
            {
                TempData["ShowLoginModal"] = true;
                return RedirectToAction("Index", "Home");
            }

            int parsedUserId = int.Parse(userId);

            var favorites = from like in _context.Likes
                            join sheltered in _context.Sheltered
                            on like.IDAnimal equals sheltered.IDAnimal
                            where like.IDUser == parsedUserId
                            select sheltered;

            return View("~/Views/Adotar/Favorito.cshtml", favorites.ToList());
        }
    }
}
