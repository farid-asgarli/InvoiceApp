using System;
using System.Threading.Tasks;
using System.Threading;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Projects
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
                var Project = await context.Projects.FindAsync(request.Id);

                if(Project==null) return null;

                context.Projects.Remove(Project);

                 bool success = await context.SaveChangesAsync() > 0;

                if(!success) return Result<Unit>.Failure("Could not remove project");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}