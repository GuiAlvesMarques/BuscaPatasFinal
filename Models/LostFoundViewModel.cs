using System.Collections.Generic;

namespace BuscaPatasFinal.Models
{
    public class LostFoundViewModel
    {
        public IEnumerable<Lost> LostAnimals { get; set; }
        public IEnumerable<Found> FoundAnimals { get; set; }
    }
}
