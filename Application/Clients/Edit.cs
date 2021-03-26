using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
   public class Edit 
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

                var client = await context.Clients.FirstOrDefaultAsync(x=>x.Id == request.Client.Id);

                if(client==null) return null;

                client.Name = request.Client.Name;
                client.Surname = request.Client.Surname;
                
                context.Entry(client).State = EntityState.Modified;
                

                var success = await context.SaveChangesAsync() > 0;
                
                if(!success) return  Result<Unit>.Failure("Could not save changes. This might happen due to the following reasons:"+
                " \n - There was an error in the application's database"+
                " \n - No changes occured to save to the database");

                return Result<Unit>.Success(Unit.Value);
              

            }
        }
    }
}