using System.ComponentModel.DataAnnotations;

namespace BuscaPatasFinal.Models
{
    public class Like

    {
        [Key]
        public int IDLike { get; set; }
        public int IDUser { get; set; }
        public int IDSpecies { get; set; }
        public int IDAnimal { get; set; }
    }
}
