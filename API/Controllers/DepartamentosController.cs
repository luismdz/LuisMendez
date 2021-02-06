using AutoMapper;
using API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public DepartamentosController(AppDbContext dbContext,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<DepartamentoDto>>> GetAll()
        {
            var departamentos = await dbContext.Departamentos
                .Include(x => x.Usuarios)
                .ToListAsync();

            if(departamentos == null) { return BadRequest(); }

            var dto = mapper.Map<List<DepartamentoDto>>(departamentos);
            return Ok(dto);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<DepartamentoDto>> GetById(int id)
        {
            var departamento = await dbContext.Departamentos
                .Where(x => x.Id == id)
                .Include(x => x.Usuarios)
                .FirstOrDefaultAsync();

            if (departamento == null) { return NotFound(); }

            var dto = mapper.Map<DepartamentoDto>(departamento);

            return Ok(dto);
        }
    }
}
