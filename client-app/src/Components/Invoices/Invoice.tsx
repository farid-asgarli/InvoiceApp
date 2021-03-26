import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Invoice } from "../../Models/invoice";
import { useStore } from "../../Store/store";
import ButtonPrimary from "../../UI/Button/ButtonPrimary";
import InvoiceForm from "./InvoiceForm";
import { format } from "date-fns";
import { useFormik } from "formik";
import DateInputField from "../../UI/Form/DateInputField";
import InputFieldSecondary from "../../UI/Form/InputFieldSecondary";
import SwitchField from "../../UI/Form/SwitchField";
import { Container } from "react-bootstrap";
import { InvoiceSearchParams } from "../../Models/searchParams";
import { Header } from "semantic-ui-react";
import TitleBar from "../../UI/TitleBar/TitleBar";
import { exportToXLS } from "../../Helper/ExportToExcel";

function Invoices() {
  const [appLoaded, setAppLoaded] = useState(false);

  const { invoiceStore, modalStore, projectStore, clientStore } = useStore();
  const { invoices, getInvoices } = invoiceStore;

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  const launchEditForm = (x: Invoice) => {
    invoiceStore.setSelectedInvoice({
      ...x,
      projectId: x.project?.id,
      clientId: x.client?.id,
    });
    modalStore.show(
      <InvoiceForm
        appLoaded={appLoaded}
        projects={projectStore.projects}
        clients={clientStore.clients}
      />
    );
  };

  useEffect(() => {
    projectStore
      .getProjects()
      .then(() => clientStore.getClients())
      .then(() => {
        if (
          clientStore.clients.length > 0 &&
          projectStore.projects.length > 0
        ) {
          setAppLoaded(true);
        }
      });
    return () => {
      invoiceStore.setFilterParams(
        new InvoiceSearchParams({
          byClient: false,
          byProject: false,
          endDate: new Date("2021-12-1"),
          searchString: "",
          startDate: new Date("2021-1-1"),
        })
      );
    };
  }, [clientStore, invoiceStore, projectStore]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: invoiceStore.filterParams,
    onSubmit: (values) => {
      console.log(values.byProject);
      console.log(values.byClient);
      invoiceStore.setFilterParams(values);
      invoiceStore.getInvoices();
    },
  });

  return (
    <>
      <Container>
        <Header
          as="h1"
          content="Invoices"
          textAlign="center"
          style={{ margin: "50px 0px" }}
        />
        <ButtonPrimary
          type="button"
          text="Add Invoice"
          clickEvent={() =>
            modalStore.show(
              <InvoiceForm
                appLoaded={appLoaded}
                projects={projectStore.projects}
                clients={clientStore.clients}
              />
            )
          }
        />
        
        <form onSubmit={formik.handleSubmit}>
          <DateInputField
            name="startDate"
            value={formik.values.startDate}
            error={formik.errors.startDate}
            onChange={(data: Date) => formik.setFieldValue("startDate", data)}
            isStart={true}
          />
          <DateInputField
            name="endDate"
            value={formik.values.endDate}
            error={formik.errors.endDate}
            onChange={(data: Date) => formik.setFieldValue("endDate", data)}
            isEnd={true}
          />

          <SwitchField
            name="byProject"
            value={formik.values.byProject}
            onChange={formik.handleChange}
            label={"Search by Projects only"}
          />
          <SwitchField
            name="byClient"
            value={formik.values.byClient}
            onChange={formik.handleChange}
            label={"Search by Clients only"}
          />

          <InputFieldSecondary
            name="searchString"
            type="text"
            placeholder="Search..."
            value={formik.values.searchString}
            onChange={formik.handleChange}
            error={formik.errors.searchString}
          />
          <ButtonPrimary type="submit" text="Search" />
          <ButtonPrimary
          style={{marginLeft:"20px"}}
          type="button"
          text="Export To XL"
          clickEvent={() => exportToXLS(invoiceStore.invoices, `Invoices - ${new Date().getMilliseconds()}`)}
        />
        </form>
      </Container>

      <Container>
        {invoices.length > 0 ? (
          <table className="table mt-5 mb-5">
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Date</th>
                <th scope="col">Net Amount</th>
                <th scope="col">Tax Amount</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Project Name</th>
                <th scope="col">Client Name</th>
                <th scope="col">Note</th>
                <th scope="col">Pending</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((x) => (
                <tr key={x.id}>
                  <th scope="row">{x.id}</th>
                  <td>{format(x.date, "dd MMM yyyy h:mm aa")}</td>
                  <td>{x.netAmount}</td>
                  <td>{x.taxAmount}</td>
                  <td>{x.totalAmount}</td>
                  <td>{x.project?.name}</td>
                  <td>{x.client?.name}</td>
                  <td>{x.note}</td>
                  <td>{x.isPending ? "true" : "false"}</td>
                  <td>
                    <ButtonPrimary
                      type="button"
                      text="Edit"
                      clickEvent={() => launchEditForm(x)}
                    />
                  </td>
                  <td>
                    <ButtonPrimary
                      type="button"
                      text="Delete"
                      clickEvent={() => invoiceStore.delete(x.id!)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>#</td>
                <td className="totalsTitle">Totals</td>
                <td className="totals">
                  {invoiceStore.calcAmounts[1] - invoiceStore.calcAmounts[0]}
                </td>
                <td className="totals">{invoiceStore.calcAmounts[0]}</td>
                <td className="totals">{invoiceStore.calcAmounts[1]}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div style={{ margin: "50px 0" }}>
            <TitleBar title="Start by Adding Invoices" subTitle="No Invoices" />
          </div>
        )}
      </Container>
    </>
  );
}

export default observer(Invoices);
