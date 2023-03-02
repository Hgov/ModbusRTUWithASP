using Microsoft.EntityFrameworkCore;
using NModbusTCP.Data.Entities;
using System.Reflection.Metadata;

namespace NModbusTCP.Data
{
    public class NModbusDbContext : DbContext
    {
        public NModbusDbContext(DbContextOptions<NModbusDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Parameters>()
                .HasKey(u => new { u.id });
            modelBuilder.Entity<ParameterItems>()
                .HasKey(u => new { u.id });
            modelBuilder.Entity<ParameterItems>()
                .HasOne(u => u.Parameters)
                .WithMany(u => u.ParameterItems)
                .HasForeignKey(u => u.parameterid);
        }
        public DbSet<Entities.Parameters> parameters { get; set; }
        public DbSet<Entities.ParameterItems> parameterItems { get; set; }
    }
}
