using BuscaPatasFinal.Data;
using BuscaPatasFinal.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BuscaPatasFinal.Controllers
{
    public class SearchController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SearchController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return View("SearchResults", new List<dynamic>());
            }

            var shelteredResults = _context.Sheltered
                .Where(s => s.AnimalName.Contains(query) || s.Breed.Contains(query))
                .Select(s => new
                {
                    Name = s.AnimalName,
                    Description = $"Raça: {s.Breed}, Idade: {s.Age}",
                    ImageUrl = s.Image != null ? $"data:image/jpeg;base64,{Convert.ToBase64String(s.Image)}" : "/img/img-adotar.png",
                    DetailsUrl = $"/Sheltered/Details/{s.IDAnimal}"
                })
                .ToList();

            var shelterResults = _context.Shelter
                .Where(s => s.ShelterName.Contains(query) || s.Location.Contains(query))
                .Select(s => new
                {
                    Name = s.ShelterName,
                    Description = $"Localização: {s.Location}",
                    ImageUrl = s.Logo != null ? $"data:image/jpeg;base64,{Convert.ToBase64String(s.Logo)}" : "/img/img-shelter.png",
                    DetailsUrl = $"/Shelter/Details/{s.IDShelter}"
                })
                .ToList();

            var results = shelteredResults.Concat<dynamic>(shelterResults).ToList();

            return View("~/Views/Adotar/search-result.cshtml", results);
        }


    }
}
