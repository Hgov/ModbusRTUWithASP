﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using NModbusTCP.Data.Infrastructure.Repository;
using System.Linq;

namespace NModbusTCP.Data.Infrastructure.Service
{
    public class ParametersWithParameterItemsService<TEntity> : Repository<TEntity> where TEntity : class, new()
    {
        private readonly NModbusDbContext _nModbusDbContext;
        public ParametersWithParameterItemsService(NModbusDbContext nModbusDbContext) : base(nModbusDbContext)
        {
            _nModbusDbContext = nModbusDbContext;
        }


        public void ParametersWithParameterItems()
        {
            var query = _nModbusDbContext.parameters
                .Include(x => x.ParameterItems)
                .ToList();
        }
        public bool ParametersIsExisting(int id)
        {
            var query = _nModbusDbContext.parameters.Where(x => x.id == id).Any();
            return query;
        }
        public void ParametersRemoveWithItems(int parameterid)
        {
            var queryFind = _nModbusDbContext.parameterItems.Where(x => x.parameterid == parameterid).ToList();
            if (queryFind != null)
            {
                _nModbusDbContext.parameterItems.RemoveRange(queryFind);
                _nModbusDbContext.SaveChanges();
            }

        }
    }
}
