import { Client } from "./client";
import { Project } from "./project";

export interface Invoice{
    id:number;
    totalAmount:number;
    taxAmount:number;
    project:Project|undefined;
    client:Client|undefined;
    note:string;
    isPending:boolean;
    netAmount:number;
    date:Date;
    projectId?:string;
    clientId?:string;
}

export interface InvoiceFormValues{
    id?:number;
    totalAmount:number;
    taxAmount:number;
    projectId?:string;
    clientId?:string;
    note:string;
    date:Date;
    isPending:boolean;

}

export class InvoiceFormValues{
    id?:number=0;
    totalAmount:number=0;
    taxAmount:number=0;
    projectId?:string='';
    clientId?:string='';
    note:string='';
    date:Date=new Date();
    isPending:boolean=true;

    

    constructor(values?:InvoiceFormValues)
    {
        
        if(values){
            this.id = values.id;
            this.date=values.date;
            this.clientId=values.clientId;
            this.taxAmount= values.taxAmount;
            this.projectId = values.projectId;
            this.note = values.note;
            this.totalAmount = values.totalAmount
            this.isPending = values.isPending;
        }
    }
}
