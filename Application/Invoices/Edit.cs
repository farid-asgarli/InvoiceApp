using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Invoices.DTO;
using Domain;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public InvoiceDto invoiceDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
              private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var invoice = await context.Invoices.FindAsync(request.invoiceDto.Id);

                 Client client = await context.Clients.FindAsync(request.invoiceDto.ClientId);
                if (client == null) return null;

                Project project = await context.Projects.FindAsync(request.invoiceDto.ProjectId);
                if (project == null) return null;

                if(invoice==null) return null;

                invoice.TotalAmount = request.invoiceDto.TotalAmount;
                invoice.TaxAmount = request.invoiceDto.TaxAmount;
                invoice.Note = request.invoiceDto.Note;
                invoice.Date = request.invoiceDto.Date;
                invoice.NetAmount = request.invoiceDto.NetAmount;
                invoice.Project = project;
                invoice.Client = client;
                invoice.IsPending = request.invoiceDto.IsPending;

                context.Entry(invoice).State = Microsoft.EntityFrameworkCore.EntityState.Modified; 

                var success = await context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Could not save changes. This might happen due to the following reasons:" +
                 " \n - There was an error in the application's database" +
                 " \n - No changes occured to save to the database");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}