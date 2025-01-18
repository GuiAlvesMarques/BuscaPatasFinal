using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace BuscaPatasFinal.Models
{
    public class Shelter
    {
        [Key]
        public int IDShelter { get; set; }

        // Nome do abrigo
        [Required]
        public string ShelterName { get; set; }

        // Localização do abrigo
        public string Location { get; set; }

        // E-mails
        public string Email { get; set; }

        public string? EmailAdoptions { get; set; }

        public string? EmailVolunteering { get; set; }

        // Número de telefone
        public string PhoneNumber { get; set; }

        // Descrição do abrigo
        public string ShelterDescription { get; set; }

        // Capacidade máxima e atributos
        public int? MaximumCapacity { get; set; }
        public bool? IsFull { get; set; }
        public bool? AcceptsSurrenders { get; set; }

        // Informações financeiras
        public string? IBAN { get; set; }

        public long? MBWay { get; set; }

        public string? PayPal { get; set; }

        // Redes sociais
        [Url]
        public string? Website { get; set; }

        [Url]
        public string? Instagram { get; set; }

        [Url]
        public string? Facebook { get; set; }

        [Url]
        public string? TikTok { get; set; }

        [Url]
        public string? Twitter { get; set; }

        // Informações adicionais
        public string InKindDescription { get; set; }
        public string AboutVisits { get; set; }
        public string AdoptionProcess { get; set; }

        // Informações relacionadas a imagens
        [NotMapped]
        public IFormFile UploadedImage { get; set; } // Para o upload da logo

        public byte[]? Logo { get; set; } // Armazena a logo como byte[]

        public ICollection<Sheltered> ShelteredAnimals { get; set; } = new List<Sheltered>();

    }
}
