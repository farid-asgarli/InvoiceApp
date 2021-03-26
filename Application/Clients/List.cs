using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class List
    {
        public class Query : IRequest<Result<List<Client>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Client>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context){
                this.context = context;
            }
            public async Task<Result<List<Client>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Clients = await context.Clients.ToListAsync();

                return Result<List<Client>>.Success(Clients);
            }
        }
    }
}