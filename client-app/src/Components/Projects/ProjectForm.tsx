import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Header, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { ProjectFormValues } from '../../Models/project';
import { useStore } from '../../Store/store';
import ButtonPrimary from '../../UI/Button/ButtonPrimary';
import InputField from '../../UI/Form/InputField';

function ProjectForm() {

  const {projectStore} = useStore();

  const [project, setProject] = useState<ProjectFormValues>(new ProjectFormValues());

  useEffect(()=>{
   if(projectStore.selectedProject){
    setProject(projectStore.selectedProject);
   }

    return ()=>projectStore.setSelectedProject(undefined);
  },[projectStore, projectStore.selectedProject, projectStore.setSelectedProject])

  const handleSubmitCustom = (values:ProjectFormValues) => {
    project.id?projectStore.edit(values):projectStore.add(values);
  }

  return (
    <Formik
    initialValues={project}
    enableReinitialize
    onSubmit={(values, {setErrors}) => handleSubmitCustom(values)}
        validationSchema={Yup.object({
            name: Yup.string().required("Name can not be empty"),
        })}
  >
    {({handleSubmit, errors}) => (
       <Form onSubmit={handleSubmit} autoComplete='off'>
       <Header as='h2' content={projectStore.selectedProject?"Edit Project":"Add Project"} color='teal' textAlign='center'  style={{marginBottom:50}}/>
       <InputField type="text" name="name" placeholder="Project Name" />
       <ErrorMessage 
           name='error' render={() => 
           <Label style={{marginBottom: 10}} basic color='red' content={errors}/>
         }
       />
       <ButtonPrimary type="submit" text={projectStore.selectedProject?"Edit":"Add"}/>
   </Form>
    )}
  </Formik>
  );
}

export default observer(ProjectForm);