using API.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Genero { get; set; }
        public string Cedula { get; set; }
        public string Cargo { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public SupervisorDto Supervisor { get; set; }
        public DepartamentoUsuarioDto Departamento { get; set; }
    }
}
