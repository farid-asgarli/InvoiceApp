using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class Details
    {
        public class Query : IRequest<Result<UserDto>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<UserDto>>
        {

            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userManager = userManager;
            }

            public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                AppUser user = await context.Users.FindAsync(request.Id);

                if (user == null) return null;

                var claims = await userManager.GetClaimsAsync(user);

                bool IsAdmin = claims?.FirstOrDefault(x=>x.Type=="IsAdmin"&&x.Value=="true")!=null?true:false;

                UserDto userDetails = new UserDto
                {
                    Id= user.Id,
                    IsAdmin=IsAdmin,
                    Name=user.Name,
                    Surname = user.Surname,
                };

                return Result<UserDto>.Success(userDetails);
            }
        }
    }
}