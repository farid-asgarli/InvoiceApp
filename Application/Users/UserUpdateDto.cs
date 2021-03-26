using System.ComponentModel.DataAnnotations;

namespace Application.Users
{
    public class UserUpdateDto
    {
        public string Id;
        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$",ErrorMessage="Password is too weak")]
        public string Password { get; set; }

        public bool IsAdmin {get;set;}
    }
}