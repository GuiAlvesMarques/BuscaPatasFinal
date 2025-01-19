using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuscaPatasFinal.Models
{
    [Table("donation")]
    public class Donation
    {
        [Key]
        public int IDDonation { get; set; }  // Primary Key with Auto Increment

        [Required]
        [MaxLength(10)]
        public string DonationAmount { get; set; }  // Donation amount with max length 10

        public bool DonationBuscaPatas { get; set; }  // Tinyint(1) mapped to bool

        [Required]
        [MaxLength(200)]
        public string NomeShelter { get; set; }  // Shelter name with max length 200
    }
}