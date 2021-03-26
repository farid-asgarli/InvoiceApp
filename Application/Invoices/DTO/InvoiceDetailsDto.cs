using System;
using Domain;

namespace Application.Invoices.DTO
{
    public class InvoiceDetailsDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int TaxAmount { get; set; }
        public int TotalAmount { get; set; }

        public Project Project { get; set; }

        public Client Client { get; set; }
        public string Note { get; set; }
        public bool IsPending { get; set; }
        public int NetAmount { get; set; }
    }
}