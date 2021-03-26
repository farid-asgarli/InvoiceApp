export interface AppUser{
    id:string; 
    name:string;
    surname:string;
    email:string;
    isAdmin:string;
    password:string;
}

export  class AppFormValues {
    id?:string=''; 
    name:string='';
    surname:string='';
    email:string='';
    isAdmin:string='false';
    password?:string='';
    constructor(values?:AppFormValues) {

       if(values)
       {
        this.id = values.id;
        this.email = values.email;
        this.name = values.name;
        this.surname = values.surname;
        this.isAdmin = values.isAdmin;
        this.password =values.password;
       }
    }

}