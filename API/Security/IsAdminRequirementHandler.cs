using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Security
{
    public class IsAdminRequirementHandler : AuthorizationHandler<IsAdminRequirement>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly DataContext context;
        public IsAdminRequirementHandler(UserManager<AppUser> userManager, DataContext context)
        {
            this.context = context;
            this.userManager = userManager;

        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdminRequirement requirement)
        {
            AppUser user = await userManager.GetUserAsync(context.User);

            if(user ==null) return;

            var userClaims  = await userManager.GetClaimsAsync(user);

            if(userClaims.Any()&& userClaims.FirstOrDefault(x=>x.Type=="IsAdmin"&&x.Value=="true")!=null) context.Succeed(requirement);
        }
    }
}