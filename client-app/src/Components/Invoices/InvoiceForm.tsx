import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import ButtonPrimary from "../../UI/Button/ButtonPrimary";
import InputFieldSecondary from "../../UI/Form/InputFieldSecondary";
import SelectField from "../../UI/Form/SelectField";
// import * as Yup from "yup";
import { InvoiceFormValues } from "../../Models/invoice";
import DateInputField from "../../UI/Form/DateInputField";
import { Header } from "semantic-ui-react";
import { Project } from "../../Models/project";
import { Client } from "../../Models/client";
import SwitchField from "../../UI/Form/SwitchField";
import { Link } from "react-router-dom";

interface Props{
  appLoaded:boolean;
  projects:Project[];
  clients:Client[]
}

function InvoiceForm({appLoaded,clients,projects}:Props) {
  const [invoice, setInvoice] = useState<InvoiceFormValues>(
    new InvoiceFormValues()
  );
  const { invoiceStore,modalStore } = useStore();
  
  useEffect(()=>{
    if(invoiceStore.selectedInvoice){
      setInvoice(invoiceStore.selectedInvoice);
    }else{
     appLoaded&&setInvoice(new InvoiceFormValues({
      date:new Date(),
      note:'',
      taxAmount:0,
      totalAmount:0,
      clientId:clients[0].id,
      projectId:projects[0].id,
      isPending:true
    }))
    }
    return () => invoiceStore.setSelectedInvoice(undefined);
  }, [appLoaded, clients, invoiceStore, projects])


  const handleSubmitCustom = (values: InvoiceFormValues) => {
    invoice.id? invoiceStore.edit(values) : invoiceStore.add(values);
    console.log(values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: invoice,
    onSubmit: (values) => {
      handleSubmitCustom(values);
      // console.log(values.isPending)
    },
  });
  return (
    <>
      {!appLoaded && <h5>Please start by adding <Link to="/projects"  onClick={()=>modalStore.hide()} >Projects</Link> and <Link to="/clients"  onClick={()=>modalStore.hide()} >Clients</Link> first</h5>}
      {appLoaded && (
        <form onSubmit={formik.handleSubmit}>
          <Header
            as="h2"
            content={invoice.id! > 0 ? "Edit Invoice" : "Add Invoice"}
            color="teal"
            textAlign="center"
            style={{ marginBottom: 50 }}
          />
          <InputFieldSecondary
            placeholder="Total Amount"
            error={formik.errors.totalAmount}
            name="totalAmount"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.totalAmount}
          />
          <InputFieldSecondary
            placeholder="TaxAmount"
            name="taxAmount"
            error={formik.errors.taxAmount}
            type="number"
            onChange={formik.handleChange}
            value={formik.values.taxAmount}
          />

          <DateInputField
            name="date"
            value={formik.values.date}
            error={formik.errors.date}
            onChange={(data: Date) => formik.setFieldValue("date", data)}
          />

          <InputFieldSecondary
            placeholder="Note"
            name="note"
            type="text"
            error={formik.errors.note}
            onChange={formik.handleChange}
            value={formik.values.note}
          />

          <SelectField
            placeholder="Select Project"
            name="projectId"
            onChange={formik.handleChange}
            value={formik.values.projectId}
          >
            {projects.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </SelectField>
          <SelectField
            placeholder="Select Client"
            name="clientId"
            onChange={formik.handleChange}
            value={formik.values.clientId}
          >
            {clients.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </SelectField>
          <SwitchField name="isPending" 
          value={formik.values.isPending} 
          onChange={formik.handleChange}
          label= {"Pending?"}
        />
          <ButtonPrimary type="submit" text="Submit" />
        </form>
      )}
    </>
  );
}

export default observer(InvoiceForm);
