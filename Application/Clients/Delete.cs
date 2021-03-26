using System;
using System.Threading.Tasks;
using System.Threading;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Clients
{
    public class Delete
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var client = await context.Clients.FindAsync(request.Id);

                if(client==null) return null;

                context.Clients.Remove(client);

                 bool success = await context.SaveChangesAsync() > 0;

                if(!success) return Result<Unit>.Failure("Could not remove client");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}