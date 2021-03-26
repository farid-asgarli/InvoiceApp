using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Result<Project>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Project>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Project>> Handle(Query request, CancellationToken cancellationToken)
            {
                Project Project = await context.Projects.FindAsync(request.Id);

                if(Project==null) return null;

                return Result<Project>.Success(Project);

            }
        }
    }
}