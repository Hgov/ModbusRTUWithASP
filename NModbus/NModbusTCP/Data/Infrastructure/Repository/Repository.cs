using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NModbusTCP.Data.Infrastructure.Repository
{
    public class Repository<TEntity> where TEntity : class
    {
        protected NModbusDbContext _Context;
        private readonly DbSet<TEntity> _dbSet;

        public Repository(NModbusDbContext context)
        {
            this._Context = context;
            this._dbSet = _Context.Set<TEntity>();
        }
        public async Task<TEntity> AddAsync(TEntity entity)
        {
            var _entity = await _dbSet.AddAsync(entity);
            return _entity.Entity;
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await _dbSet.AddRangeAsync(entities);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TEntity> GetByIDAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public void Remove(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public TEntity Update(TEntity entity)
        {
            return _dbSet.Update(entity).Entity;
        }
        public void UpdateRange(IEnumerable<TEntity> entities)
        {
            _dbSet.UpdateRange(entities);
        }

        public void saveChanges()
        {
            _Context.SaveChanges();
        }
        public void SaveChangesAsync()
        {
            _Context.SaveChangesAsync();
        }
    }
}
