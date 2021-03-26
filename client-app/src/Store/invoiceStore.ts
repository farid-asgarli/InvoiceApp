import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../API/agent";
import { Invoice, InvoiceFormValues } from "../Models/invoice";
import { InvoiceSearchParams } from "../Models/searchParams";
import { store } from "./store";

export default class InvoiceStore {
  invoices: Invoice[] = [];
  selectedInvoice: Invoice | undefined;
  filterParams: InvoiceSearchParams = {
    byClient: false,
    byProject: false,
    endDate: new Date('2021-12-1'),
    searchString: "",
    startDate: new Date("2021-1-1"),
  };
  totalAmount:number=0;
  taxAmount:number=0;

  setAmounts=(total:number,tax:number) => {
    this.totalAmount = total;
    this.taxAmount = tax;
  }

  get calcAmounts(){
    let total = 0;
    let tax = 0;
    this.invoices.forEach(x=>total+=x.totalAmount)
    this.invoices.forEach(x=>tax+=x.taxAmount)
    runInAction(()=>this.setAmounts(total,tax));
    return [this.taxAmount,this.totalAmount]
  }

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.invoices,
      () =>this.calcAmounts
    );
  }

  setFilterParams = (values:InvoiceSearchParams) => {
    this.filterParams = values;
  }

  setInvoices = (values: Invoice[]) => {
    this.invoices = values;
  };

  setSelectedInvoice = (value: Invoice | undefined) => {
    this.selectedInvoice = value;
  };

  get searchParams() {
    const params = new URLSearchParams();
    params.append(
      "startDate",
      this.filterParams.startDate!.toISOString().toString().split("T")[0]
    );
    params.append(
      "endDate",
      this.filterParams.endDate!.toISOString().toString().split("T")[0]
    );
    params.append("byProject", String(this.filterParams.byProject));
    params.append("byClient", String(this.filterParams.byClient));
    params.append("searchString",String(this.filterParams.searchString).toLowerCase())
    return params;
  }

  getInvoices = async () => {
    try {
      const Invoices = await agent.Invoices.list(this.searchParams);
     
      Invoices.forEach((x) => (x.date = new Date(x.date)));
      this.setInvoices(Invoices);
    } catch (error) {
      console.log(error);
    }
  };

  add = async (values: InvoiceFormValues) => {
    try {
      const invoice = await agent.Invoices.add(values);
      invoice.date = new Date(invoice.date);
      this.setInvoices([...this.invoices, invoice]);
      toast.success(`Invoice № "${invoice.id}" got added succesfully!`);
      store.modalStore.hide();
    } catch (error) {
      console.log(error);
    }
  };

  edit = async (values: InvoiceFormValues) => {
    try {
      await agent.Invoices.edit(values);
      store.modalStore.hide();
      const project = store.projectStore.projects.filter(
        (x) => x.id === values.projectId
      )[0];
      const client = store.clientStore.clients.filter(
        (x) => x.id === values.clientId
      )[0];

      const invoice: Invoice = {
        project: project,
        client: client,
        date: values.date,
        id: values.id!,
        isPending: values.isPending,
        netAmount: values.totalAmount - values.taxAmount,
        note: values.note,
        taxAmount: values.taxAmount,
        totalAmount: values.totalAmount,
      };

      this.setInvoices([
        ...this.invoices.filter((x) => x.id !== values.id),
        invoice,
      ]);
      toast.info(`Invoice № "${values.id}" got updated succesfully!`)
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id: number) => {
    try {
      await agent.Invoices.delete(id);
      this.setInvoices([...this.invoices.filter((x) => x.id !== id)]);
      toast.warning(`Invoice got deleted succesfully!`);
    } catch (error) {
      console.log(error);
    }
  };
}
