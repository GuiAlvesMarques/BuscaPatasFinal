using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuscaPatasFinal.Models
{

    // Represents the structure of a quiz submission by a user
    public class QuizSubmission
    {
        public int UserId { get; set; } // ID of the user taking the quiz
        public string Species { get; set; } // "dog" or "cat"
        public List<string> Size { get; set; } // List of selected sizes
        public List<string> AgeRange { get; set; } // List of selected age ranges
        public string EnergyLevel { get; set; } // Single selected energy level
        public string Furtype { get; set; } // Single selected shedding level
        public string Shedding { get; set; } // Single selected health comfort level
       // public string SocialCompatibility { get; set; } // Single selected social compatibility
       // public string ChildrenCompatibility { get; set; } // Single selected children compatibility
       // public string Personality { get; set; } // Single selected personality
       // public List<string> Vocalization { get; set; } // List of vocalization preferences
       // public string Allergies { get; set; } // Single selected allergy preference
    }


    // Represents a stored quiz attempt in the database
    public class QuizAttempt
    {
        [Key]
        public int IDQuizz { get; set; }
        public int UserId { get; set; }
        //public DateTime AttemptDate { get; set; }
        public string? Species { get; set; }
        public string? Pergunta1 { get; set; } // Species
        public string? Pergunta2 { get; set; } // Size
        public string? Pergunta3 { get; set; } // AgeRange
        public string? Pergunta4 { get; set; } // EnergyLevel
        public string? Pergunta5 { get; set; } // Shedding
        public string? Pergunta6 { get; set; } // HealthComfort
        public string? Pergunta7 { get; set; } // SocialCompatibility
        public string? Pergunta8 { get; set; } // ChildrenCompatibility
        public string? Pergunta9 { get; set; } // Personality
        public string? Pergunta10 { get; set; } // Vocalization
        public string? Pergunta11 { get; set; } // Allergies
                                               
        // Add properties for Pergunta12 through Pergunta28 as needed
    }

    [Table("usermatchedanimals")]
    [PrimaryKey(nameof(UserId), nameof(IDAnimal), nameof(IDQuizz))]
    public class UserMatchedAnimal
    {
        public int UserId { get; set; }

        public int IDAnimal { get; set; }

        [Required]
        [StringLength(255)]
        public string AnimalName { get; set; }

        public byte[]? Image { get; set; }

        [Required]
        public int IDQuizz { get; set; }

        [ForeignKey("IDQuizz")]
        public virtual QuizAttempt QuizzAttempt { get; set; }
    }

    [Table("AnimalList")]
    [PrimaryKey(nameof(IDUser), nameof(IDAnimal))]
    public class AnimalList
    {
        public int IDUser { get; set; }
        public int IDAnimal { get; set; }

        [Required]
        [StringLength(255)]
        public string AnimalName { get; set; }

        public byte[]? Image { get; set; }

        [Required]
        public int IDSpecies { get; set; }  // Added species ID field
    }

    public class MatchedAnimalViewModel
    {
         public int IDAnimal { get; set; }
        public string AnimalName { get; set; }
        public string ImageBase64 { get; set; }
    }

    public class AnimalListViewModel
    {
        public int IDAnimal { get; set; }
        public string AnimalName { get; set; }
        public byte[] Image { get; set; }
        public int IDSpecies { get; set; }
    }
}
