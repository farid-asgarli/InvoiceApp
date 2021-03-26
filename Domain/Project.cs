using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage="Project Name can not be empty")]
        [StringLength(100)]
        public string Name { get; set; }
    }
}