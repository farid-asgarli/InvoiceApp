import { makeAutoObservable } from "mobx";
import { User, UserFormValues } from "../Models/user";
import agent from "../API/agent";
import { store } from "./store";
import { history } from "../index";

export default class UserStore {
  user: User | null = null;


  constructor() {
    makeAutoObservable(this);   
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setUser = (user: User | null) => (this.user = user);


  login = async (credentials: UserFormValues) => {
    try {
      const user = await agent.Account.login(credentials);
      store.commonStore.setToken(user.token);
      this.setUser(user);
      console.log(user)
      history.push("/");
    } catch (error) {
      throw error;
    }
  };
  

  logout = () => {
    store.commonStore.token = null;
    localStorage.removeItem("jwt");
    this.setUser(null);
    store.clientStore.setClients([]);
    store.invoiceStore.setInvoices([]);
    store.projectStore.setProjects([]);
    store.appUserStore.setAppUsers([]);
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  
}
