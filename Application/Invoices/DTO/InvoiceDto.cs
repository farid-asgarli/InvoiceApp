using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Invoices.DTO
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int TotalAmount { get; set; }

        public int NetAmount =>TotalAmount- TaxAmount;
        [Required]

        public int TaxAmount { get; set; }
        [Required]

        public Guid ProjectId { get; set; }
        [Required]

        public Guid ClientId { get; set; }
        public string Note { get; set; }
        public bool IsPending { get; set; }
    }
}