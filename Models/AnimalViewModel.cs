namespace BuscaPatasFinal.ViewModels
{
    public class AnimalViewModel
    {
        public int IDAnimal { get; set; }
        public string AnimalName { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string Size { get; set; }
        public byte[] Image { get; set; }
        public bool IsSurrendered { get; set; } // Para diferenciar se é da tabela Surrender
        public int IDSpecies { get; set; } // Adiciona a propriedade IDSpecies
    }
}
