using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuscaPatasFinal.Models
{
    public class Surrender
    {
        [Key]
        public int IDAnimal { get; set; }

        [Required]
        public int IDSpecies { get; set; }

        [StringLength(50)]
        public string ReasonForSurrender { get; set; }

        [StringLength(50)]
        public string AnimalName { get; set; }

        [StringLength(50)]
        public string Sex { get; set; }

        [StringLength(20)]
        public string AgeRange { get; set; }

        public int Age { get; set; }

        public DateTime? Birthday { get; set; } // Nullable since it is optional

        [StringLength(200)]
        public string Size { get; set; }

        [StringLength(50)]
        public string Breed { get; set; }

        [StringLength(200)]
        public string Personality { get; set; }

        [StringLength(50)]
        public string HealthStatus { get; set; }

        [StringLength(200)]
        public string Diet { get; set; }

        [StringLength(50)]
        public string Care { get; set; }

        [StringLength(50)]
        public string Location { get; set; }

        [StringLength(50)]
        public string Username { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(15)]
        public string Phone { get; set; }

        [NotMapped]
        public IFormFile UploadedImage { get; set; } // Para o arquivo enviado
        public byte[]? Image { get; set; } 



    }
}
