using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Invoices.DTO;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Invoices
{
    public class Details
    {
        public class Query : IRequest<Result<InvoiceDetailsDto>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<InvoiceDetailsDto>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<InvoiceDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var invoice = await context.Invoices.Include(x => x.Client).Include(x => x.Project).FirstOrDefaultAsync(x => x.Id == request.Id);

                if (invoice == null) return null;

                InvoiceDetailsDto invoiceDetails = new InvoiceDetailsDto
                {
                    Client = invoice.Client,
                    Project = invoice.Project,
                    Date = invoice.Date,
                    Id = invoice.Id,
                    IsPending = invoice.IsPending,
                    NetAmount = invoice.NetAmount,
                    Note = invoice.Note,
                    TaxAmount = invoice.TaxAmount,
                    TotalAmount = invoice.TotalAmount
                };


                return Result<InvoiceDetailsDto>.Success(invoiceDetails);


            }
        }
    }
}