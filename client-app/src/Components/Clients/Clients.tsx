import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Header } from "semantic-ui-react";
import { Client } from "../../Models/client";
import { useStore } from "../../Store/store";
import ButtonPrimary from "../../UI/Button/ButtonPrimary";
import TitleBar from "../../UI/TitleBar/TitleBar";
import ClientForm from "./ClientForm";

function Clients() {
  const { clientStore, modalStore } = useStore();
  const { clients, getClients } = clientStore;

  useEffect(() => {
    getClients();
  }, [getClients]);

  const launchEditForm = (x: Client) => {
    clientStore.setSelectedClient(x);
    modalStore.show(<ClientForm />);
  };

  return (
    <Container>
        <Header as='h1' content="Clients" textAlign='center'  style={{margin:"50px 0px"}}/>
      <ButtonPrimary
        type="button"
        text="Add Client"
        clickEvent={() => modalStore.show(<ClientForm />)}
      />
      {clients.length > 0 ? (
        <table className="table mt-5 mb-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((x) => (
              <tr key={x.id}>
                <th scope="row">{x.id}</th>
                <td>{x.name}</td>
                <td>{x.surname}</td>
                <td>
                  <ButtonPrimary
                    type="button"
                    text="Delete"
                    clickEvent={() => clientStore.delete(x.id!)}
                  />
                </td>
                <td>
                  <ButtonPrimary
                    type="button"
                    text="Edit"
                    clickEvent={() => launchEditForm(x)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ):
      <div style={{margin:"50px 0"}} >
        <TitleBar title="Start by Adding Clients" subTitle ="No Clients" />
      </div>}
    </Container>
  );
}

export default observer(Clients);
