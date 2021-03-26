import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Header } from "semantic-ui-react";
import { Project } from "../../Models/project";
import { useStore } from "../../Store/store";
import ButtonPrimary from "../../UI/Button/ButtonPrimary";
import TitleBar from "../../UI/TitleBar/TitleBar";
import ProjectForm from "./ProjectForm";

function Projects() {
  const { projectStore, modalStore } = useStore();
  const { projects, getProjects } = projectStore;

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const launchEditForm = (x: Project) => {
    projectStore.setSelectedProject(x);
    modalStore.show(<ProjectForm />);
  };

  return (
    <Container>
        <Header as='h1' content="Projects" textAlign='center'  style={{margin:"50px 0px"}}/>
      <ButtonPrimary
        type="button"
        text="Add Project"
        clickEvent={() => modalStore.show(<ProjectForm />)}
      />

      {projects.length > 0 ? (
        <table className="table mt-5 mb-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((x) => (
              <tr key={x.id}>
                <th scope="row">{x.id}</th>
                <td>{x.name}</td>
                <td>
                  <ButtonPrimary
                    type="button"
                    text="Delete"
                    clickEvent={() => projectStore.delete(x.id!)}
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
      <TitleBar title="Start by Adding Projects" subTitle ="No Projects" />
    </div>}
    </Container>
  );
}

export default observer(Projects);
