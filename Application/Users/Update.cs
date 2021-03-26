using System.Security.Claims;
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
    public class Update
    {
        public class Command : IRequest<Result<UserDto>>
        {
            public UserUpdateDto userUpdateDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<UserDto>>
        {
            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                this.context = context;
                this.userManager = userManager;
            }

            public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await context.Users.FindAsync(request.userUpdateDto.Id);

                if (user == null) return null;

                user.Name = request.userUpdateDto.Name;
                user.Surname = request.userUpdateDto.Surname;
                user.Email = request.userUpdateDto.Email;
                user.IsAdmin = request.userUpdateDto.IsAdmin;

                if (request.userUpdateDto.Password != null)
                {
                    var token = await userManager.GeneratePasswordResetTokenAsync(user);

                    await userManager.ResetPasswordAsync(user, token, request.userUpdateDto.Password);
                }

                Claim claim = new Claim("IsAdmin", "true");

                await userManager.RemoveClaimAsync(user, claim);

                if (request.userUpdateDto.IsAdmin)
                {
                    await userManager.AddClaimAsync(user, claim);
                }

                context.Entry(user).State = EntityState.Modified;
                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<UserDto>.Failure("Could not save changes. This might happen due to the following reasons:" +
                 " \n - There was an error in the application's database" +
                 " \n - No changes occured to save to the database");

                return Result<UserDto>.Success(new UserDto{
                    Email=user.Email,
                    Id=user.Id,
                    IsAdmin=user.IsAdmin,
                    Name=user.Name,
                    Surname=user.Surname
                });

            }
        }
    }
}