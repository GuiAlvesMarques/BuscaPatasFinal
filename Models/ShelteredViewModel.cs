using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;


namespace BuscaPatasFinal.Models
{
    public class Sheltered
    {
        [Key]
        public int IDAnimal { get; set; }
        public int IDSpecies { get; set; }
        public int IDEditor { get; set; }
        public string IDSector { get; set; }
        public string History { get; set; }
        public string Sponsors { get; set; }
        public bool IsForAdoption { get; set; }
        public bool IsForFostering { get; set; }
        public bool IsBeingFostered { get; set; }
        public string AnimalName { get; set; }
        public string Sex { get; set; }
        public string AgeRange { get; set; }
        public int Age { get; set; }
        public DateTime? Birthday { get; set; }
        public string Size { get; set; }
        public string Breed { get; set; }
        public string Personality { get; set; }
        public string HealthStatus { get; set; }
        public string Diet { get; set; }
        public string Care { get; set; }
        public string Location { get; set; }
        public byte[]? Image { get; set; } // Armazena a imagem no banco de dados
        [NotMapped]
        public IFormFile UploadedImage { get; set; } // Usado para processar a imagem no formulário

    }
}
