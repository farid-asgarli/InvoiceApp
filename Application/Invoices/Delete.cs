using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Invoices
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int Id { get; set; }
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
                var invoice = await context.Invoices.FindAsync(request.Id);

                if(invoice==null) return null;

                context.Invoices.Remove(invoice);

                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Could not save changes. This might happen due to the following reasons:" +
                 " \n - There was an error in the application's database" +
                 " \n - No changes occured to save to the database");

                return Result<Unit>.Success(Unit.Value);

                
            }
        }
    }
}