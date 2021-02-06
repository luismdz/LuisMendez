using AutoMapper;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public UsuariosController(AppDbContext dbContext, 
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<UsuarioDto>>> GetAll()
        {
            var usuarios = await dbContext.Usuarios
                .Include(x => x.Departamento)
                .Include(x => x.Supervisor)
                .ToListAsync();

            if (usuarios == null) { return BadRequest(); }

            var dto = mapper.Map<List<UsuarioDto>>(usuarios);
            
            return Ok(dto);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UsuarioDto>> GetById(int id)
        {
            var usuario = await dbContext.Usuarios
                .Where(x => x.Id == id)
                .Include(x => x.Departamento)
                .Include(x => x.Supervisor)
                .FirstOrDefaultAsync();

            if (usuario == null) { return NotFound(); }

            var dto = mapper.Map<UsuarioDto>(usuario);
            
            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<UsuarioDto>> Post([FromBody] UsuarioCreacionDto nuevoUsuario)
        {
            if(nuevoUsuario == null) 
            {
                return BadRequest(new ArgumentNullException(nameof(nuevoUsuario)));
            };

            Regex regex = new Regex(@"^[0-9]{3}-[0-9]{7}-[0-9]{1}$");
            
            if(!regex.IsMatch(nuevoUsuario.Cedula))
            {
                return BadRequest("Cedula Format Error. Must be 000-0000000-0");
            }

            var usuario = mapper.Map<Usuario>(nuevoUsuario);

            usuario.Departamento = await dbContext.Departamentos
                .Where(x => x.Codigo == nuevoUsuario.Departamento)
                .FirstOrDefaultAsync();

            usuario.SupervisorId = nuevoUsuario.Supervisor;

            await dbContext.AddAsync(usuario);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var usuario = await dbContext.Usuarios
                .Where(x => x.Id == id)
                .Include(x => x.Departamento)
                .Include(x => x.Supervisor)
                .FirstOrDefaultAsync();

            if (usuario == null) { return NotFound(); }

            dbContext.Usuarios.Remove(usuario);

            if(await dbContext.SaveChangesAsync() > 0)
            {
                return Ok();
            }

            return NoContent();
        }


    }
}
