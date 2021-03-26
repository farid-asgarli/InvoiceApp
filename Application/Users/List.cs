using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{

    public class List
    {
        public class Query : IRequest<Result<List<UserDto>>>
        {
            public AppUser User { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserDto>>>
        {
            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                this.userManager = userManager;
                this.context = context;

            }
            public async Task<Result<List<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                // var user = await userManager.Users.FirstOrDefaultAsync(x=>x.Id)

               var users = await context.Users
               .Where(x=>x!=request.User)
               .Select(x => new UserDto
               {
                   Id = x.Id,
                   Name = x.Name,
                   Surname = x.Surname,
                   Email = x.Email,
                   IsAdmin = x.IsAdmin

               })
               .ToListAsync();

                return Result<List<UserDto>>.Success(users);
            }
        }
    }
}