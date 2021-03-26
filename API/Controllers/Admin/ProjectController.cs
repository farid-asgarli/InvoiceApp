using System.Threading.Tasks;
using Application.Projects;
using Domain;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers.Admin
{
    public class ProjectController:BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize("IsAdmin")] 
        [HttpPost("addProject")]
         public async Task<IActionResult> Create(Project project){
            return HandleResult(await Mediator.Send(new Create.Command{Project = project}));
        }

        [Authorize("IsAdmin")]
        [HttpPut("{id}/editProject")]
        public async Task<IActionResult> Edit(Guid Id,Project project){
            project.Id=Id;
            
            return HandleResult(await Mediator.Send(new Edit.Command{Project=project}));
        }

        [Authorize("IsAdmin")]
        [HttpDelete("{id}/deleteProject")]
        public async Task<IActionResult> Delete(Guid Id){
            
            return HandleResult(await Mediator.Send(new Delete.Command{Id=Id}));
        }
        
        [Authorize("IsAdmin")]
        [HttpGet("{id}")]

         public async Task<IActionResult> GetDetails(Guid Id){
            
            return HandleResult(await Mediator.Send(new Details.Query{Id=Id}));
        }
    }
}