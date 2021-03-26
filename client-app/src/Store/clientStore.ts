import { makeAutoObservable } from "mobx";
import agent from "../API/agent";
import { Client, ClientFormValues } from "../Models/client";
import { v4 as uuid } from "uuid";
import { store } from "./store";
import { toast } from "react-toastify";


export default class ClientStore{
  
    clients:Client[]=[];
    selectedClient :Client|undefined;
    
    
    constructor() {
       makeAutoObservable(this);
        
    }

    setClients =(value:Client[]) => {
        this.clients = value;
    }
    setSelectedClient =(value:Client|undefined) => {
      this.selectedClient = value;
  }

    getClients = async()=>{
        try {
            const clients = await agent.Clients.list();
            this.setClients(clients);

        } catch (error) {
            console.log(error)
        }
    }

    delete = async(Id:string)=>{
        console.log(Id);
        try {
          await agent.Clients.delete(Id);
          this.setClients(this.clients.filter(x=>x.id!==Id));
          toast.warning(`Client got successfully deleted!`);
        } catch (error) {
          console.log(error)
        }
      }

    add = async(values:ClientFormValues)=>
    {
      try {

        const client = {...values,id:uuid()};
        await agent.Clients.add(client);
        this.setClients([...this.clients,client]);  
        toast.success(`Client "${client.name} ${client.surname}" got successfully added!`);
        store.modalStore.hide();
      } catch (error) {
        console.log(error);
      }
    }

    edit = async(values:ClientFormValues)=>
    {
      try {
        
        await agent.Clients.edit(values);
        this.setClients([...this.clients.filter(x=>x.id!==values.id),(values as Client)]);
        toast.info(`Client "${values.name}" got updated succesfully!`)
        store.modalStore.hide();
      } catch (error) {
        console.log(error)
      }
    }
}