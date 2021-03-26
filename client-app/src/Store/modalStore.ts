import { makeAutoObservable } from "mobx";

export default class ModalStore{
    active:boolean=false;
    body:JSX.Element|null=null;

    constructor()
    {
        makeAutoObservable(this);
    }

    show=(content:JSX.Element) => {
        this.active=true;
        this.body= content;
    }  

    hide = ()=>{
        this.active = false;
        this.body = null;
    }

}