using System.Collections.Generic;

namespace testbuscapatas.Models
{
    public class LostFoundViewModel
    {
        public IEnumerable<Lost> LostAnimals { get; set; }
        public IEnumerable<Found> FoundAnimals { get; set; }
    }
}
