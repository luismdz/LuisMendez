using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Departamento
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength:10)]
        public string Codigo { get; set; }
        [Required]
        [StringLength(maximumLength: 80)]
        public string Nombre { get; set; }
        public List<Usuario> Usuarios { get; set; }
    }
}
