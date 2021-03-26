using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Clients
{
    public class Details
    {
        public class Query : IRequest<Result<Client>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Client>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Client>> Handle(Query request, CancellationToken cancellationToken)
            {
                Client client = await context.Clients.FindAsync(request.Id);

                if(client==null) return null;

                return Result<Client>.Success(client);

            }
        }
    }
}