using Microsoft.AspNetCore.Mvc;
using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using System;
using System.IO;
using System.Linq;

namespace BuscaPatasFinal.Controllers
{
    public class LostFoundController : Controller
    {
        private readonly ApplicationDbContext _context;

        public LostFoundController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: Register a new lost animal
        [HttpPost]
        public IActionResult RegisterLost([FromForm] Lost lost)
        {
            Console.WriteLine("Recebida uma requisição POST para RegisterLost.");

            // Validação inicial do ModelState
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState inválido.");
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
                // Verifica se a imagem foi carregada
                if (lost.UploadedImage != null && lost.UploadedImage.Length > 0)
                {
                    Console.WriteLine($"Imagem recebida: {lost.UploadedImage.FileName}, tamanho: {lost.UploadedImage.Length} bytes");

                    // Valida o tipo do arquivo (somente imagens)
                    if (lost.UploadedImage.ContentType.StartsWith("image/"))
                    {
                        // Valida o tamanho do arquivo (limite: 10 MB)
                        if (lost.UploadedImage.Length > 10485760) // 10 MB
                        {
                            Console.WriteLine("O tamanho da imagem excede o limite permitido.");
                            ModelState.AddModelError("UploadedImage", "O tamanho da imagem não pode exceder 10 MB.");
                            return BadRequest(new { error = "Arquivo grande demais", details = ModelState });
                        }

                        // Processa a imagem e converte para byte[]
                        using (var memoryStream = new MemoryStream())
                        {
                            try
                            {
                                lost.UploadedImage.CopyTo(memoryStream);
                                lost.Image = memoryStream.ToArray();
                                Console.WriteLine($"Imagem convertida para byte[], tamanho: {lost.Image.Length} bytes");
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Erro ao processar a imagem: {ex.Message}");
                                return BadRequest(new { error = "Erro ao processar a imagem." });
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine("Arquivo enviado não é uma imagem válida.");
                        ModelState.AddModelError("UploadedImage", "Somente arquivos de imagem são permitidos.");
                        return BadRequest(new { error = "Formato de arquivo inválido", details = ModelState });
                    }
                }
                else
                {
                    Console.WriteLine("Nenhuma imagem foi enviada.");
                    ModelState.AddModelError("UploadedImage", "O campo de imagem é obrigatório.");
                    return BadRequest(new { error = "Campo de imagem ausente", details = ModelState });
                }

                // Salva os dados no banco de dados
                _context.Lost.Add(lost);
                _context.SaveChanges();

                Console.WriteLine("Animal perdido salvo com sucesso no banco de dados.");

                return RedirectToAction("Perdidos");
            }
            catch (Exception ex)
            {
                // Tratamento de erro para problemas no banco de dados ou outras exceções
                Console.WriteLine($"Erro ao salvar no banco de dados: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }

                return StatusCode(500, new
                {
                    error = $"Erro interno do servidor: {ex.Message}",
                    stackTrace = ex.StackTrace
                });
            }
        }

        [HttpGet]
        public IActionResult Perdidos()
        {
            var viewModel = new LostFoundViewModel
            {
                LostAnimals = _context.Lost.ToList(),
                FoundAnimals = _context.Found.ToList()
            };

            return View("~/Views/Adotar/perdidos-e-encontrados.cshtml", viewModel);
        }

        [HttpPost]
        public IActionResult RegisterFound([FromForm] Found found)
        {
            Console.WriteLine("Recebida uma requisição POST para RegisterFound.");

            // Validação inicial do ModelState
            if (!ModelState.IsValid)
            {
                Console.WriteLine("ModelState inválido.");
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
                // Verifica se a imagem foi carregada
                if (found.UploadedImage != null && found.UploadedImage.Length > 0)
                {
                    Console.WriteLine($"Imagem recebida: {found.UploadedImage.FileName}, tamanho: {found.UploadedImage.Length} bytes");

                    // Valida o tipo do arquivo (somente imagens)
                    if (found.UploadedImage.ContentType.StartsWith("image/"))
                    {
                        // Valida o tamanho do arquivo (limite: 10 MB)
                        if (found.UploadedImage.Length > 10485760) // 10 MB
                        {
                            Console.WriteLine("O tamanho da imagem excede o limite permitido.");
                            ModelState.AddModelError("UploadedImage", "O tamanho da imagem não pode exceder 10 MB.");
                            return BadRequest(new { error = "Arquivo grande demais", details = ModelState });
                        }

                        // Processa a imagem e converte para byte[]
                        using (var memoryStream = new MemoryStream())
                        {
                            try
                            {
                                found.UploadedImage.CopyTo(memoryStream);
                                found.Image = memoryStream.ToArray();
                                Console.WriteLine($"Imagem convertida para byte[], tamanho: {found.Image.Length} bytes");
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Erro ao processar a imagem: {ex.Message}");
                                return BadRequest(new { error = "Erro ao processar a imagem." });
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine("Arquivo enviado não é uma imagem válida.");
                        ModelState.AddModelError("UploadedImage", "Somente arquivos de imagem são permitidos.");
                        return BadRequest(new { error = "Formato de arquivo inválido", details = ModelState });
                    }
                }
                else
                {
                    Console.WriteLine("Nenhuma imagem foi enviada.");
                    ModelState.AddModelError("UploadedImage", "O campo de imagem é obrigatório.");
                    return BadRequest(new { error = "Campo de imagem ausente", details = ModelState });
                }

                // Salva os dados no banco de dados
                _context.Found.Add(found);
                _context.SaveChanges();

                Console.WriteLine("Animal encontrado salvo com sucesso no banco de dados.");

                return RedirectToAction("Perdidos");
            }
            catch (Exception ex)
            {
                // Tratamento de erro para problemas no banco de dados ou outras exceções
                Console.WriteLine($"Erro ao salvar no banco de dados: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }

                return StatusCode(500, new
                {
                    error = $"Erro interno do servidor: {ex.Message}",
                    stackTrace = ex.StackTrace
                });
            }
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var lostAnimal = _context.Lost.FirstOrDefault(a => a.IDAnimal == id);
            if (lostAnimal == null)
            {
                return NotFound();
            }

            return View("~/Views/Adotar/Details.cshtml", lostAnimal);
        }

        [HttpGet]
        public IActionResult DetailsFound(int id)
        {
            var foundAnimal = _context.Found.FirstOrDefault(a => a.IDAnimal == id);
            if (foundAnimal == null)
            {
                return NotFound();
            }

            return View("~/Views/Adotar/DetailsFound.cshtml", foundAnimal);
        }

        public IActionResult DetailsLost(int id)
        {
            var foundAnimal = _context.Lost.FirstOrDefault(a => a.IDAnimal == id);
            if (foundAnimal == null)
            {
                return NotFound();
            }

            return View("~/Views/Adotar/DetailsLost.cshtml", foundAnimal);
        }
    }
}
