using AutoMapper;
using API.DTOs;
using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Utilities
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Departamento, DepartamentoDto>()
                .ForMember(x => x.Usuarios, options => options.MapFrom(MapearUsuarios));
            CreateMap<Departamento, DepartamentoUsuarioDto>().ReverseMap();
            CreateMap<Usuario, UsuarioDto>().ReverseMap();
            CreateMap<Usuario, UsuarioCreacionDto>().ReverseMap()
                .ForMember(x => x.Supervisor, opt => opt.Ignore())
                .ForMember(x => x.Departamento, opt => opt.Ignore())
                .ForMember(x => x.SupervisorId, opt => opt.Ignore())
                .ForMember(x => x.DepartamentoId, opt => opt.Ignore());

            CreateMap<UsuarioDto, UsuarioCreacionDto>().ReverseMap();
            CreateMap<Usuario, SupervisorDto>().ReverseMap();
            
        }

        private List<UsuarioDto> MapearUsuarios(Departamento departamento, DepartamentoDto departamentoDto)
        {
            var result = new List<UsuarioDto>();

            if(departamento.Usuarios != null)
            {
                foreach (var usuario in departamento.Usuarios)
                {
                    result.Add(new UsuarioDto()
                    {
                        Id = usuario.Id,
                        Nombres = usuario.Nombres,
                        Apellidos = usuario.Apellidos,
                        Cedula = usuario.Cedula,
                        Cargo = usuario.Cargo,
                        Genero = usuario.Genero,
                        FechaNacimiento = null
                    });
                }

                return result;
            }

            return result;
        }

    }
}
