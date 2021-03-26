using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenService tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.userManager = userManager;
        }

       [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);



            if (user == null) return Unauthorized("Invalid email");
            // await userManager.AddClaimAsync(user, new Claim("IsAdmin","true"));

            var claims = await userManager.GetClaimsAsync(user);

            bool IsAdmin = true;

            if (claims.FirstOrDefault(x => x.Type == "IsAdmin" && x.Value == "true") == null){
                    IsAdmin = false;
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {

                return new UserDto
                {
                    Token = tokenService.CreateToken(user),
                    Name = user.Name,
                    Surname = user.Surname,
                    IsAdmin = IsAdmin
                };

            }

            return Unauthorized("Invalid password");
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.Users.FirstOrDefaultAsync(x => x.Id == User.FindFirstValue(ClaimTypes.NameIdentifier));
            return ReturnUserObject(user);

        }

        private UserDto ReturnUserObject(AppUser user)
        {
            return new UserDto
            {
                Token = tokenService.CreateToken(user),
                Name=user.Name,
                Surname = user.Surname,
                IsAdmin = user.IsAdmin,
            };
        }
    }
}