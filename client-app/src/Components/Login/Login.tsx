import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react'
import { Header, Label } from 'semantic-ui-react';
import { useStore } from '../../Store/store';
import ButtonPrimary from '../../UI/Button/ButtonPrimary';
import InputField from '../../UI/Form/InputField';
import './Login.css';
import * as Yup from 'yup';

export default function Login() {
    const {userStore} = useStore();

    return<Formik
    initialValues={{email: '', password: '',id:undefined, error: null}}
    onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
        setErrors({error: error.response.data}))}
        validationSchema={Yup.object({
            email: Yup.string().email(x=>`${x.value} is not a valid email`).required("Email can not be empty"),
            password :Yup.string().required("Password can not be empty")
        })}
  >
    {({handleSubmit, errors}) => (
       <div className="LoginForm">
           <div className="container">
           <div className="row">
           <div className="col-lg-12">
           <Form onSubmit={handleSubmit} autoComplete='off'>
            <Header as='h2' content='Login' textAlign='center'  style={{marginBottom:50}}/>
            <Header as='h6' content='Admin: bob@test.com' textAlign='center'  style={{marginBottom:50}}/>
            <Header as='h6' content='Password: Pa$$w0rd (Same for the users)' textAlign='center'  style={{marginBottom:50}}/>
            <InputField type="text" name="email" placeholder="Email" />
            <InputField type="password" name="password" placeholder="Password" />
            <ErrorMessage 
                name='error' render={() => 
                <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
            />
            <ButtonPrimary type="submit" text="Login"/>
        </Form>
           </div>
       </div>
       </div>
       </div>
    )}
  </Formik>
}
