export interface User{
    name:string;
    surname:string;
    email?:string;
    token:string;
    isAdmin?:boolean;
}

export interface UserFormValues{
    email:string;
    password:string;
}

