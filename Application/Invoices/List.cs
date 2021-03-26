using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Invoices
{
    public class List
    {
        public class Query : IRequest<Result<List<Invoice>>>
        {
            public InvoiceParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Invoice>>>
        {
            private readonly DataContext context;


            public Handler(DataContext context)
            {
                this.context = context;

            }
            public async Task<Result<List<Invoice>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Invoices.Include(x => x.Project).Include(x => x.Client)
                .Where(x => x.Date >= request.Params.StartDate.AddDays(-1) && x.Date <= request.Params.EndDate.AddDays(1))
                .OrderBy(x => x.Date).AsQueryable();

                if (!string.IsNullOrWhiteSpace(request.Params.SearchString))
                {
                    if ((request.Params.byClient && request.Params.byProject)||(!request.Params.byClient && !request.Params.byProject))
                    {
                        query = query.Where(x =>
                            x.Client.Name.ToLower().Contains(request.Params.SearchString)
                        ||  x.Client.Surname.ToLower().Contains(request.Params.SearchString)
                        ||  x.Project.Name.ToLower().Contains(request.Params.SearchString));
                    }
                    if (request.Params.byClient && !request.Params.byProject)
                    {
                        query = query.Where(x=> x.Client.Name.ToLower().Contains(request.Params.SearchString)
                        ||  x.Client.Surname.ToLower().Contains(request.Params.SearchString));
                    }
                    if (!request.Params.byClient && request.Params.byProject)
                    {
                        query = query.Where(x => x.Project.Name.ToLower().Contains(request.Params.SearchString));
                    }
                }

                var invoices = await query.ToListAsync();

                return Result<List<Invoice>>.Success(invoices);
            }
        }
    }
}