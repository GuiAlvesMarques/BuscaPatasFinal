using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testbuscapatas.Models
{
    public class Lost
    {
            [Key]
            public int IDAnimal { get; set; }
            public int IDSpecies { get; set; }
            public string Size { get; set; }
            public string AnimalName { get; set; }
            public int? Age { get; set; }
            public string Breed { get; set; }
            public string Location { get; set; }
            public DateTime LostDate { get; set; }
            public string Description { get; set; }
            public string LostEmail { get; set; }
            public string LostPhone { get; set; }
            public byte[]? Image { get; set; } // Armazena a imagem no banco de dados
            [NotMapped]
            public IFormFile UploadedImage { get; set; } // Usado para processar a imagem no formulário

    }

}
