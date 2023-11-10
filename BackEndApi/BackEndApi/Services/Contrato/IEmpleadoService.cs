using BackEndApi.Models;

namespace BackEndApi.Services.Contrato
{
    public interface IEmpleadoService
    {
        Task<List<Empleado>> GetList();
        Task<Empleado> Get(int idEmpleado);
        Task<Empleado> Add(Empleado modelo);
        Task<bool> update(Empleado modelo);
        Task<bool> delete(Empleado modelo);
    }
}
