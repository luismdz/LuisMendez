using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UsuarioCreacionDto
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Genero { get; set; }
        public string Cedula { get; set; }
        public string Cargo { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Supervisor { get; set; }
        public string Departamento { get; set; }
    }
}
