using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Clients
{
    public class Create 
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Client Client { get; set; }
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

                context.Clients.Add(request.Client);

                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Error occured while creating client");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}