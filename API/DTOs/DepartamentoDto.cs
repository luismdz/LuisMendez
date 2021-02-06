using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DepartamentoDto
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public List<UsuarioDto> Usuarios { get; set; }
    }
}
