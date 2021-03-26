using System.Threading.Tasks;
using Application.Clients;
using Domain;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers.Admin
{
    public class ClientController:BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [Authorize("IsAdmin")]
        [HttpPost("addClient")]
         public async Task<IActionResult> Create(Client client){
            return HandleResult(await Mediator.Send(new Create.Command{Client = client}));
        }
        [Authorize("IsAdmin")]
        [HttpPut("{id}/editClient")]
        public async Task<IActionResult> Edit(Guid Id,Client client){
            client.Id=Id;
            
            return HandleResult(await Mediator.Send(new Edit.Command{Client=client}));
        }

        [Authorize("IsAdmin")]
        [HttpDelete("{id}/deleteClient")]
        public async Task<IActionResult> Delete(Guid Id){
            
            return HandleResult(await Mediator.Send(new Delete.Command{Id=Id}));
        }

        [HttpGet("{id}")]

         public async Task<IActionResult> GetDetails(Guid Id){
            
            return HandleResult(await Mediator.Send(new Details.Query{Id=Id}));
        }

    }
}