using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BuscaPatasFinal.Models
{
    public class Sheltered
    {
        [Key]
        public int IDAnimal { get; set; } // Primary key
        public int IDSpecies { get; set; } // Species identifier
       // public int IDEditor { get; set; } // Editor identifier

       // [ForeignKey("IDShelter")]
       // public int IDShelter { get; set; } // Foreign Key associada a Shelter
        public string IDSector { get; set; }

        public string? History { get; set; } // Animal's history
        public string? Sponsors { get; set; } // Sponsor information
        public bool IsForAdoption { get; set; } // Is the animal up for adoption?
        public bool IsForFostering { get; set; } // Is the animal up for fostering?
        public bool IsBeingFostered { get; set; } // Is the animal currently being fostered?

        public string AnimalName { get; set; } // Animal name
        public string Sex { get; set; } // Sex (e.g., male, female)
        public string? AgeRange { get; set; } // Age range (e.g., young, adult, senior)
        public int Age { get; set; } // Exact age in years
        public DateTime? Birthday { get; set; } // Birthday (optional)

        public string Size { get; set; } // Size (e.g., small, medium, large)
        public string Breed { get; set; } // Breed (e.g., Labrador, Persian cat)
        public string? Personality { get; set; } // Personality traits
        public string HealthStatus { get; set; } // Health status information
        public bool Diet { get; set; } // Dietary requirements
        public bool Care { get; set; } // Special care needs
        public string? Location { get; set; } // Shelter location
        public bool? Shedding { get; set; } // Shedding characteristics
        public string Energy { get; set; } // Energy level (1-5)
        public string Furtype { get; set; } // Type of fur
        public bool IsBlind { get; set; } // Is the animal blind?
        public bool IsSick { get; set; } // Is the animal sick?
        public bool IsHandicap { get; set; } // Is the animal handicapped?

        public bool ReactiveDogs { get; set; } // Reacts to dogs
        public bool ReactiveCats { get; set; } // Reacts to cats
        public bool ReactiveChildren { get; set; } // Reacts to children

        public string Fear { get; set; } // Fear level (1-5)
        public bool HouseTrained { get; set; } // House-trained (e.g., knows where to urinate)
        public bool IsVocal { get; set; } // Is the animal vocal?

        public bool IsHypoallergenic { get; set; } // Is the animal hypoallergenic?
        public DateTime? arrival_Date { get; set; } // Arrival date at the shelter

        public string Behaviour { get; set; } // General behavior level (1-5)
        public string Independence { get; set; } // Independence level (1-5)
        public string Playfulness { get; set; } // Playfulness level (1-5)
        public string Calmness { get; set; } // Calmness level (1-5)
        public string Neediness { get; set; } // Neediness level (1-5)

        [NotMapped]
        public IFormFile UploadedImage { get; set; } // Para o arquivo enviado
        public byte[]? Image { get; set; }           // Para armazenar no banco

        [ForeignKey("IDShelter")]
        public Shelter? Shelter { get; set; } // Propriedade de navegação

        // Navigation property for matched users
        public virtual ICollection<User> MatchedUsers { get; set; } = new List<User>();
    }
}
