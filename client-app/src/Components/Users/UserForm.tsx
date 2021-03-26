import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { AppFormValues } from "../../Models/appUser";
import { useStore } from "../../Store/store";
import ButtonPrimary from "../../UI/Button/ButtonPrimary";
import InputFieldSecondary from "../../UI/Form/InputFieldSecondary";
import SelectField from "../../UI/Form/SelectField";
import * as Yup from 'yup';
import { Header } from "semantic-ui-react";

function UserForm() {
  const [appUser, setAppUser] = useState<AppFormValues>(new AppFormValues());

  const { appUserStore } = useStore();
  useEffect(() => {
    if (appUserStore.selectedAppUser) {
      setAppUser(appUserStore.selectedAppUser);
    }
    return () => appUserStore.setSelectedAppUser(undefined);
  }, [appUserStore, appUserStore.selectedAppUser]);

  const handleSubmitCustom = (values: AppFormValues) => {
    appUser.id ? appUserStore.edit(values) : appUserStore.add(values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema:Yup.object({
      name:Yup.string().required("Name can not be empty"),
      surname:Yup.string().required("Surname can not be empty"),
      email:Yup.string().email(x=>`${x.value} is not a valid email`).required("Email can not be empty"),
      password:!appUser.id?Yup.string().required("Password can not be empty").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,"Password must contain symbol, uppercase and number").min(4).max(20):Yup.string(),

    }),
    initialValues: appUser,
    onSubmit: (values) => {
      handleSubmitCustom(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
       <Header as='h2' content={appUser.id?"Edit User":"Add User"} color='teal' textAlign='center'  style={{marginBottom:50}}/>
      <InputFieldSecondary
        placeholder="Name"
        error={formik.errors.name}
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <InputFieldSecondary
        placeholder="Surname"
        name="surname"
        error={formik.errors.surname}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.surname}
      />
      <InputFieldSecondary
        placeholder="Email"
        name="email"
        error={formik.errors.email}
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <InputFieldSecondary
        placeholder={appUserStore.selectedAppUser?"Password - Leave empty for no changes":"Password"}
        name="password"
        type="password"
        error={formik.errors.password}
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <SelectField
        name="IsAdmin"
        onChange={(e:any)=>{formik.setValues({...formik.values,isAdmin:e.target.value})}}
        value={formik.values.isAdmin}
      >
        <option value="true">Admin</option>
        <option value="false">User</option>
      </SelectField>
      <ButtonPrimary type="submit" text="Submit" />
    </form>
  );
}

export default observer(UserForm);
