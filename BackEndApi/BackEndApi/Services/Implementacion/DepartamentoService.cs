using Microsoft.EntityFrameworkCore;
using BackEndApi.Models;
using BackEndApi.Services.Contrato;

namespace BackEndApi.Services.Implementacion
{
    public class DepartamentoService :IDepartamentoService
    {
        private DbempleadoContext _dbcontext;
        public DepartamentoService(DbempleadoContext dbcontext)
        {
            _dbcontext = dbcontext; 
        }

        public async Task<List<Departamento>> GetList()
        {
            try{
                List<Departamento> lista = new List<Departamento>();
                lista = await _dbcontext.Departamentos.ToListAsync();
                return lista;
            }
            catch(Exception ex) { throw ex; }
        }
    }
}
