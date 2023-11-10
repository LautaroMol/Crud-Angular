using Microsoft.EntityFrameworkCore;
using BackEndApi.Models;
using BackEndApi.Services.Contrato;

namespace BackEndApi.Services.Implementacion
{
    public class EmpleadoService : IEmpleadoService
    {
        private DbempleadoContext _dbcontext;
        public EmpleadoService(DbempleadoContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<Empleado>> GetList()
        {
            try
            {
                List<Empleado> list = new List<Empleado>();
                list = await _dbcontext.Empleados.Include(dpt => dpt.IdDepartamentoNavigation).ToListAsync();
                return list;
            }catch (Exception ex) { throw ex; }
        }
        public async Task<Empleado> Get(int idEmpleado)
        {
            try
            {
                Empleado? encontrado = new Empleado();
                encontrado = await _dbcontext.Empleados.Include(dpt => dpt.IdDepartamentoNavigation).Where(
                    e => e.IdEmpleado == idEmpleado).FirstOrDefaultAsync();
                return encontrado;
            }
            catch (Exception ex) { throw ex; }
        }

        public async Task<Empleado> Add(Empleado modelo)
        {
            try
            {
                _dbcontext.Empleados.Add(modelo);
                await _dbcontext.SaveChangesAsync();
                return modelo;
            }
            catch (Exception ex) { throw ex; }
        }
        public async Task<bool> update(Empleado modelo)
        {
            try
            {
                _dbcontext.Empleados.Update(modelo);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public async Task<bool> delete(Empleado modelo)
        {
            try
            {
                _dbcontext.Empleados.Remove(modelo);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

    }
}
