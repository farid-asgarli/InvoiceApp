using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Invoices.DTO;
using Domain;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class Create
    {
        public class Command : IRequest<Result<Invoice>>
        {
            public InvoiceDto InvoiceDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Invoice>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<Invoice>> Handle(Command request, CancellationToken cancellationToken)
            {
                Client client = await context.Clients.FindAsync(request.InvoiceDto.ClientId);
                if (client == null) return null;

                Project project = await context.Projects.FindAsync(request.InvoiceDto.ProjectId);
                if (project == null) return null;

                Invoice invoice = new Invoice
                {
                    Client = client,
                    Project = project,
                    Date = request.InvoiceDto.Date,
                    IsPending = request.InvoiceDto.IsPending,
                    Note = request.InvoiceDto.Note,
                    TaxAmount = request.InvoiceDto.TaxAmount,
                    TotalAmount = request.InvoiceDto.TotalAmount,
                    NetAmount = request.InvoiceDto.NetAmount
                };

                await context.Invoices.AddAsync(invoice);

                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<Invoice>.Failure("Error occured while creating client");

                return Result<Invoice>.Success(invoice);
            }
        }


    }
}