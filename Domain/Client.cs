using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Client
    {
        public Guid Id { get; set; }
        [Required]
        public string Surname { get; set; }
        
        [Required]
        public string Name { get; set; }
    }
}