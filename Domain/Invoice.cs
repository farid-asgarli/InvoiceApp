using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Invoice
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int TaxAmount { get; set; }
        public int TotalAmount { get; set; }
        
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        public Guid ProjectId { get; set; }
        
        [ForeignKey("ClientId")]
        public Client Client { get; set; }
        public Guid ClientId { get; set; }
        public string Note { get; set; }
        public bool IsPending { get; set; }
        public int NetAmount { get; set; }
  
    }
}