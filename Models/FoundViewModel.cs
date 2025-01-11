using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuscaPatasFinal.Models
{
    public class Found
    {
        [Key]
        public int IDAnimal { get; set; }
        public int IDSpecies { get; set; }
        public string Size { get; set; }
        public string AgeRange { get; set; }
        public string Breed { get; set; }
        public string Location { get; set; }
        public DateTime FoundDate { get; set; }
        public string Description { get; set; }
        public string FoundEmail { get; set; }
        public string FoundPhone { get; set; }
        public byte[]? Image { get; set; } // Armazena a imagem no banco de dados
        [NotMapped]
        public IFormFile UploadedImage { get; set; } // Usado para processar a imagem no formulário

    }

}
