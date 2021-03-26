import { createContext, useContext } from "react";
import AppUserStore from "./appUserStore";
import ClientStore from "./clientStore";
import CommonStore from "./commonStore";
import InvoiceStore from "./invoiceStore";
import ModalStore from "./modalStore";
import ProjectStore from "./projectStore";
import UiStore from "./uiStore";
import UserStore from "./userStore";

export const store ={
    uiStore:new UiStore(),
    commonStore : new CommonStore(),
    userStore : new UserStore(),
    projectStore : new ProjectStore(),
    clientStore: new ClientStore(),
    modalStore:new ModalStore(),
    appUserStore:new AppUserStore(),
    invoiceStore:new InvoiceStore()
}
export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
