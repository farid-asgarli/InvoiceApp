using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public string Token { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsAdmin { get; set; }

    }
}