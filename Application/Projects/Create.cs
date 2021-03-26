using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Create 
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Project Project { get; set; }
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

                context.Projects.Add(request.Project);

                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Error occured while creating project");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}