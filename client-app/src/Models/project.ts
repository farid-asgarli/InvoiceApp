export interface Project{
    name:string;
    id?:string;
}

export interface ProjectFormValues{ //for registration
    name:string;
    id?:string;
}

export class ProjectFormValues
{
    name:string ="";

    constructor(initialValues?:ProjectFormValues){
        if(initialValues){
            this.name=initialValues.name;
        }
    }
}