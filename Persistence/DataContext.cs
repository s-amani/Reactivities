using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Text = "Value 101" },
                    new Value { Id = 2, Text = "Value 102" },
                    new Value { Id = 3, Text = "Value 103" },
                    new Value { Id = 4, Text = "Value 104" },
                    new Value { Id = 5, Text = "Value 105" }
                );
        }
    }
}
