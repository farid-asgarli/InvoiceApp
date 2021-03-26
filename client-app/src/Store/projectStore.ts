import { makeAutoObservable } from "mobx";
import agent from "../API/agent";
import { Project, ProjectFormValues } from "../Models/project";
import { v4 as uuid } from "uuid";
import { store } from "./store";
import { toast } from "react-toastify";

export default class ProjectStore {
    projects:Project[] =[];
    selectedProject : Project|undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }

    setProjects = (value:Project[]) => {
        this.projects = value;
    }

    setSelectedProject = (value:Project|undefined)=>{
        this.selectedProject = value;
    }

    getProjects = async() => {
        try {
            const projects = await agent.Projects.list();
            this.setProjects(projects);

        } catch (error) {
            console.log(error)
        }
    }

    delete = async(Id:string)=>{
        try {
          await agent.Projects.delete(Id);
          this.setProjects(this.projects.filter(x=>x.id!==Id));
          toast.warning(`Project got succesfully deleted!`)
        } catch (error) {
          console.log(error)
        }
      }

      add = async(values:ProjectFormValues)=>
      {
        try {
  
          const project = {...values,id:uuid()};
          await agent.Projects.add(project);
          this.setProjects([...this.projects,project]); 
          toast.success(`Project "${project.name}" got added!`);
          store.modalStore.hide();
        } catch (error) {
          console.log(error);
        }
      }
  
      edit = async(values:ProjectFormValues)=>
      {
        try {
          
          await agent.Projects.edit(values);
          this.setProjects([...this.projects.filter(x=>x.id!==values.id),(values as Project)]);
          toast.info(`Project "${values.name}" got updated succesfully!`)
          store.modalStore.hide();
        } catch (error) {
          console.log(error)
        }
      }
}