using System;
using System.IO;
using System.Threading.Tasks;
using Application.Core;
using Application.Invoices;
using Application.Invoices.DTO;
using ClosedXML.Excel;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers.Admin
{
    public class InvoiceController : BaseApiController
    {
        private readonly DataContext context;
        public InvoiceController(DataContext context)
        {
            this.context = context;

        }

        [HttpPost("addInvoice")]
        public async Task<IActionResult> Create(InvoiceDto invoice)
        {
            return HandleResult(await Mediator.Send(new Create.Command { InvoiceDto = invoice }));
        }

        [HttpGet]
        public async Task<IActionResult> GetInvoices([FromQuery] InvoiceParams Params)
        {
            return HandleResult(await Mediator.Send(new List.Query { Params = Params }));
        }

        [HttpPut("{Id}/editInvoice")]
        public async Task<IActionResult> UpdateInvoice(int Id, InvoiceDto invoiceDto)
        {
            invoiceDto.Id = Id;
            return HandleResult(await Mediator.Send(new Edit.Command { invoiceDto = invoiceDto }));
        }

        [HttpDelete("{Id}/deleteInvoice")]

        public async Task<IActionResult> DeleteInvoice(int Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = Id }));
        }

        [HttpPut("{Id}/toggleStatus")]
        public async Task<IActionResult> TogglePending(int Id)
        {
            return HandleResult(await Mediator.Send(new ToggleStatus.Command { Id = Id }));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetDetails(int Id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = Id }));
        }

       
    }
}