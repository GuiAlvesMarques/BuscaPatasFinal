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
        public DbSet<User> Users { get; set; }
    }
}