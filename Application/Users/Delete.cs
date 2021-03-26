using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
            public AppUser User {get;set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly DataContext context;

            public Handler(UserManager<AppUser> userManager, DataContext context)
            {
                this.userManager = userManager;
                this.context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByIdAsync(request.Id);

                if(user==null) return null;

                if(user==request.User) return null;

                context.Users.Remove(user);

                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Could not save changes. This might happen due to the following reasons:" +
                 " \n - There was an error in the application's database" +
                 " \n - No changes occured to save to the database");

                return Result<Unit>.Success(Unit.Value);

                
            }
        }
    }
}