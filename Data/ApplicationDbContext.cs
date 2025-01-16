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
        public DbSet<Surrender> Surrender { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Lost> Lost { get; set; }
        public DbSet<Found> Found { get; set; }
        public DbSet<Sheltered> Sheltered { get; set; }
    }
}