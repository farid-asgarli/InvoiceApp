using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "bob",
                        Name = "Bob",
                        Surname = "Miller",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        UserName = "jill",
                        Name = "Jill",
                        Surname = "Valentine",
                        Email = "jill@test.com"
                    },
                    new AppUser
                    {
                        UserName = "leon",
                        Name = "Leon",
                        Surname = "Kennedy",
                        Email = "leon@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    
                }
                var adminUser = await context.Users.FirstOrDefaultAsync(x=>x.UserName=="bob");

                await userManager.AddClaimAsync(adminUser,new System.Security.Claims.Claim("IsAdmin","true"));
                adminUser.IsAdmin = true;

                await context.SaveChangesAsync();
            }
        }
    }
   }