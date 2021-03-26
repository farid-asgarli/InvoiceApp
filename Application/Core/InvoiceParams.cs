using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    public class InvoiceParams{
        public bool byProject { get; set; }
        public bool byClient { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } = DateTime.UtcNow;
        public string SearchString {get;set;}
    }
}