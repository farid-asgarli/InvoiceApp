using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Users;


namespace API.Controllers.Admin
{
    [Authorize("IsAdmin")] 
    public class UserController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;

        public UserController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }


        [HttpPost("register")]
        public async Task<ActionResult<Application.Users.UserDto>> Register(RegisterDto registerDTO)
        {
            if (await userManager.Users.AnyAsync(u => u.Email == registerDTO.Email))
            {
                ModelState.AddModelError("email", "Email is already taken");

                return ValidationProblem();

            };
          

            var user = new AppUser
            {
                Email = registerDTO.Email,
                Name=registerDTO.Name,
                Surname = registerDTO.Surname,
                UserName = registerDTO.Email,
                IsAdmin = registerDTO.IsAdmin
            };

            var result = await userManager.CreateAsync(user, registerDTO.Password);

            if(!result.Succeeded) return BadRequest("Problem occured while registering the user");

            if(registerDTO.IsAdmin)
            {
                await userManager.AddClaimAsync(user, new Claim("IsAdmin","true"));
            }
         
            return new Application.Users.UserDto{
                Id=user.Id,
                Email=user.Email,
                IsAdmin=user.IsAdmin,
                Name=user.Name,
                Surname=user.Surname
            };

        }

        [HttpGet]
        public  async Task<IActionResult> GetUsers()
        {

            return HandleResult(await Mediator.Send(new List.Query{User= await GetCurrentUser()}));
        }



        [HttpGet("{Id}")]
        public  async Task<IActionResult> GetUserDetails(string Id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=Id}));
        }

        [HttpPut("{Id}/updateUser")]
        public  async Task<IActionResult> UpdateUser(string Id, UserUpdateDto userUpdateDto)
        {
            userUpdateDto.Id= Id;

            return HandleResult(await Mediator.Send(new Update.Command{userUpdateDto= userUpdateDto}));
        }

        [HttpDelete("{Id}/deleteUser")]

        public async Task<IActionResult> RemoveUser(string Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=Id,User= await GetCurrentUser()}));
        }

        private async Task<AppUser> GetCurrentUser(){
            
            AppUser user = await userManager.Users.FirstOrDefaultAsync(x => x.Id == User.FindFirstValue(ClaimTypes.NameIdentifier));

            return user;

        }

    }
}