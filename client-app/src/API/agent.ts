import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../Store/store";
import {history} from "../index";
import { User, UserFormValues } from "../Models/user";
import { Project, ProjectFormValues } from "../Models/project";
import { Client, ClientFormValues } from "../Models/client";
import { AppFormValues, AppUser } from "../Models/appUser";
import { Invoice, InvoiceFormValues } from "../Models/invoice";

axios.defaults.baseURL= 'http://localhost:5000/api';

axios.interceptors.request.use(config=>{
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
  })

  axios.interceptors.response.use(
    async (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { data, status, statusText, config,headers } = error.response!;
      switch (status) {
        case 400:
          console.log(data);
          if(typeof data==='string'){
              toast.error(statusText);
          }
          if (config.method === "get" && data.errors.hasOwnProperty("id")) {
            history.push("/not-found");
          }
          if (data.errors) {
            const modalStateErrors = [];
            for (const k in data.errors)
              if (data.errors[k]) {
                modalStateErrors.push(data.errors[k]);
              }
            throw modalStateErrors.flat();
          }
          break;
        case 401:
          // console.log(data)
          if(status===401 && headers['www-authenticate']!=null && headers['www-authenticate'].startsWith('Bearer error="invalid_token"'))
          {
            store.userStore.logout();
            toast.error("Session Expired - please login again");
  
          }
          break;
        case 404:
          history.push("/not-found");
          break;
        case 500:
          store.commonStore.setServerError(data);
          history.push("/server-error");
  
          break;
      }
      return Promise.reject(error);
    }
  );

  const responseBody = <T>(response: AxiosResponse<T>) => response.data;

  const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
      axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  };

  const Account={
    current:()=> requests.get<User>('/account'),
    login:(user:UserFormValues)=>requests.post<User>("/account/login",user),
    register:(user:UserFormValues)=>requests.post<User>("/account/register", user),
  }

  const Users={
    list:()=>requests.get<AppUser[]>('/user'),
    delete:(Id:string)=>requests.del<void>(`/user/${Id}/deleteUser`),
    add:(values:AppFormValues)=>requests.post<AppUser>('/user/register',values),
    edit:(values:AppFormValues)=>requests.put<AppUser>(`/user/${values.id}/updateUser`,values)
  }

  const Projects ={
    list:()=>requests.get<Project[]>('/project'),
    delete:(Id:string)=>requests.del<void>(`/project/${Id}/deleteProject`),
    add:(values:ProjectFormValues)=>requests.post<void>('/project/addProject',values),
    edit:(values:ProjectFormValues)=>requests.put<void>(`/project/${values.id}/editProject`,values)

  }

  const Clients ={
    list:()=>requests.get<Client[]>('/client'),
    delete:(Id:string)=>requests.del<void>(`/client/${Id}/deleteClient`),
    add:(values:ClientFormValues)=>requests.post<void>('/client/addClient',values),
    edit:(values:ClientFormValues)=>requests.put<void>(`/client/${values.id}/editClient`,values)
  }

  const Invoices ={
    list:(params:URLSearchParams)=>axios.get<Invoice[]>('/invoice',{params}).then(responseBody),
    edit:(values:InvoiceFormValues)=>requests.put<void>(`/invoice/${values.id}/editInvoice`,values),
    add:(values:InvoiceFormValues)=>requests.post<Invoice>(`/invoice/addInvoice`,values),
    delete:(id:number)=>requests.del<void>(`/invoice/${id}/deleteInvoice`),
  }
  
  
  const agent= {
    Account,
    Users,
    Projects,
    Clients,
    Invoices
  }

  export default agent;