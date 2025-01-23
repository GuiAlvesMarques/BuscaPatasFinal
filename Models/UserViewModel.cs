using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BuscaPatasFinal.Models;

namespace BuscaPatasFinal.Models
{
    [Table("User")] // Specify the table name in the database
    public class User
    {
        [Key]
        [Column("IDUser")] // Map to the column name in the database
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("Email")] // Map to the column name in the database
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("Password")] // Map to the column name in the database
        public string Password { get; set; }

        [Required]
        [MaxLength(15)]
        [Column("PhoneNumber")] // Map to the column name in the database
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("Type")] // Map to the column name in the database
        public string Type { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("Username")] // Map to the column name in the database
        public string Username { get; set; }

        // New: Navigation property for quiz attempts
        public virtual ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();

        // New: Navigation property for matched animals
        public virtual ICollection<Sheltered> MatchedAnimals { get; set; } = new List<Sheltered>();
    }
}