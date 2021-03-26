export interface Client{
    id:string,
    name:string,
    surname:string
}

export interface ClientFormValues{
    id?:string,
    name:string,
    surname:string
}

export class ClientFormValues
{
    name:string ="";
    surname:string="";

    constructor(initialValues?:ClientFormValues){
        if(initialValues){
            this.name=initialValues.name;
            this.surname = initialValues.surname;
        }
    }
}