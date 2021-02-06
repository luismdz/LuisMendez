using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength:50)]
        public string Nombres { get; set; }
        [Required]
        [StringLength(maximumLength: 50)]
        public string Apellidos { get; set; }
        [Required]
        [StringLength(maximumLength: 1)]
        public string Genero { get; set; }
        [Required]
        [StringLength(maximumLength: 13)]
        public string Cedula { get; set; }
        [Required] 
        [StringLength(maximumLength: 50)]
        public string Cargo { get; set; }
        [Required]
        public DateTime FechaNacimiento { get; set; }
        public int? SupervisorId { get; set; }
        public Usuario Supervisor { get; set; }
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }

    }
}
