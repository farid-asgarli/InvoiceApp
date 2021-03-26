import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Header, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { ClientFormValues } from '../../Models/client';
import { useStore } from '../../Store/store';
import ButtonPrimary from '../../UI/Button/ButtonPrimary';
import InputField from '../../UI/Form/InputField';

function ClientForm() {

  const {clientStore} = useStore();

  const [client, setClient] = useState<ClientFormValues>(new ClientFormValues());

  useEffect(()=>{
   if(clientStore.selectedClient){
    setClient(clientStore.selectedClient);
   }

    return ()=>clientStore.setSelectedClient(undefined);
  },[clientStore, clientStore.selectedClient, clientStore.setSelectedClient])

  const handleSubmitCustom = (values:ClientFormValues) => {
    client.id?clientStore.edit(values):clientStore.add(values);
  }

  return (
    <Formik
    initialValues={client}
    enableReinitialize
    onSubmit={(values, {setErrors}) => handleSubmitCustom(values)}
        validationSchema={Yup.object({
            name: Yup.string().required("Name can not be empty"),
            surname :Yup.string().required("Surname can not be empty")
        })}
  >
    {({handleSubmit, errors}) => (
       <Form onSubmit={handleSubmit} autoComplete='off'>
       <Header as='h2' content={clientStore.selectedClient?"Edit Client":"Add Client"} color='teal' textAlign='center'  style={{marginBottom:50}}/>
       <InputField type="text" name="name"  placeholder="Name" />
       <InputField type="text" name="surname" placeholder="Surname" />
       <ErrorMessage 
           name='error' render={() => 
           <Label style={{marginBottom: 10}} basic color='red' content={errors}/>
         }
       />
       <ButtonPrimary type="submit" text="Add"/>
   </Form>
    )}
  </Formik>
  );
}

export default observer(ClientForm);