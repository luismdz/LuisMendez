using API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Departamento>().HasData(new Departamento
            {
                Id = 1,
                Nombre = "Ventas",
                Codigo = "VEN" + DateTime.Now.Millisecond.ToString()
            }, new Departamento
            {
                Id = 2,
                Nombre = "Programacion",
                Codigo = "PRO" + DateTime.Now.Millisecond.ToString()
            });

            modelBuilder.Entity<Departamento>()
                .HasIndex(x => x.Codigo)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
    }
}
