import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import agent from "../API/agent";
import { AppFormValues, AppUser } from "../Models/appUser";
import { store } from "./store";

export default class AppUserStore{
    appUsers:AppUser[]=[];
    selectedAppUser : AppUser|undefined;

    constructor(){
        makeAutoObservable(this);
    }
    
    setAppUsers= (values:AppUser[]) => {
        this.appUsers = values;
    }

    setSelectedAppUser = (value :AppUser|undefined) => {
        this.selectedAppUser = value;
    }

    getUsers = async()=>{
        try {
          const userList= await agent.Users.list();
          userList.forEach(x=>x.password='');
          this.setAppUsers(userList);
        } catch (error) {
          console.log(error)
        }
    }
  
    deleteUser = async(Id:string)=>{
      console.log(Id);
      try {
        await agent.Users.delete(Id);
        this.setAppUsers(this.appUsers.filter(x=>x.id!==Id));
        toast.warning(`User got deleted succesfully!`)
      } catch (error) {
        console.log(error)
      }
    }
  
    add = async(values:AppFormValues)=>
      {
        try {
  
          const user = await agent.Users.add(values);;
          user.password='';
         this.setAppUsers([...this.appUsers,user]) 
          store.modalStore.hide();
          toast.success(`User "${values.name}" got added succesfully!`)
        } catch (error) {
          console.log(error);
        }
      }
  
      edit = async(values:AppFormValues)=>
      {
        console.log(values.isAdmin)
        try {
         const user = await agent.Users.edit(values);
          user.password='';
          this.setAppUsers([...this.appUsers.filter(x=>x.id!==values.id),user]);
          toast.info(`User "${values.name}" got updated succesfully!`);
          store.modalStore.hide();
        } catch (error) {
          console.log(error)
        }
      }
}