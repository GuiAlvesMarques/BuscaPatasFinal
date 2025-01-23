using BuscaPatasFinal.Models;
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
        public DbSet<QuizAttempt> QuizAttempt { get; set; }
        public DbSet<UserMatchedAnimal> UserMatchedAnimals { get; set; }

        public DbSet<AnimalList> AnimalList { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(u => u.MatchedAnimals)
                .WithMany(a => a.MatchedUsers)
                .UsingEntity(j => j.ToTable("UserSheltered"));
        }
    }
}