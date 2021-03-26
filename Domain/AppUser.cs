using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
namespace Domain
{
    public class AppUser : IdentityUser
    {
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(100)]
        public string Surname { get; set; }
        public bool IsAdmin {get;set;} //letting the API send request to determine if the user is admin
    }
}