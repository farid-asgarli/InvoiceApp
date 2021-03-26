import { makeAutoObservable } from "mobx";

export default class UiStore{
    mobileMenu:boolean=false;
    scrolled:boolean=false;
    preLoader:boolean = true;

    constructor(){
        makeAutoObservable(this);
    }
    setPreLoader = (value:boolean) => {
        this.preLoader= value;
    }

    setMobileMenu =(value:boolean)=>{
        this.mobileMenu=value;
    }
    setScrolled = (value:boolean) => {
        this.scrolled=value;
    }

     handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 69) {
          this.setScrolled(true);
        } else {
          this.setScrolled(false);
        }
      };
}