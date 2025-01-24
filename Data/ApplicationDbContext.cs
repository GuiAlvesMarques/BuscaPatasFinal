using BuscaPatasFinal.Models;
using Microsoft.EntityFrameworkCore;

namespace BuscaPatasFinal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define DbSets for your tables
        public DbSet<Like> Likes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Lost> Lost { get; set; }
        public DbSet<Found> Found { get; set; }
        public DbSet<Sheltered> Sheltered { get; set; }
        public DbSet<Shelter> Shelter { get; set; }

        public DbSet<Surrender> Surrender { get; set; }

        public DbSet<QuizAttempt> QuizAttempt { get; set; }
        public DbSet<UserMatchedAnimal> UserMatchedAnimals { get; set; }

        public DbSet<AnimalList> AnimalList { get; set; }

        public DbSet<Donation> Donations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração do relacionamento Shelter (1) -> Sheltered (N)
            modelBuilder.Entity<Sheltered>()
                .HasOne<Shelter>(s => s.Shelter) // Propriedade de navegação na entidade Sheltered
                .WithMany(s => s.ShelteredAnimals) // Propriedade de navegação na entidade Shelter
                .HasForeignKey(s => s.IDShelter) // Chave estrangeira no modelo Sheltered
                .OnDelete(DeleteBehavior.Cascade); // Comportamento ao deletar um abrigo

            // Outras configurações adicionais (se necessário)
        }

    }
}