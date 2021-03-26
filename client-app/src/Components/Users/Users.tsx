import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Header } from 'semantic-ui-react';
import { AppUser } from '../../Models/appUser';
import { useStore } from '../../Store/store'
import ButtonPrimary from '../../UI/Button/ButtonPrimary';
import TitleBar from '../../UI/TitleBar/TitleBar';
import UserForm from './UserForm';

 function Users() {

    const {appUserStore,modalStore} = useStore();
    const {appUsers,deleteUser} = appUserStore;

    useEffect(()=>{
        appUserStore.getUsers();
    },[appUserStore])

    const launchEditForm = (x:AppUser) => {
      appUserStore.setSelectedAppUser(x);
      modalStore.show(<UserForm/>);
    }

    return (
     <Container>
        <Header as='h1' content="Users" textAlign='center'  style={{margin:"50px 0px"}}/>
       <ButtonPrimary type="button" text="Add User" clickEvent={()=>modalStore.show(<UserForm/>)} />
      {appUsers.length>0 ?
       <table className="table mt-5 mb-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Role </th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
         
      {appUsers.map(x=>
         <tr key={x.id} >
         <th scope="row">{x.id}</th>
         <td>{x.name}</td>
         <td>{x.surname}</td>
         <td>{x.email}</td>
         <td>{x.isAdmin?"Admin":"User"}</td>
         <td><ButtonPrimary type="button" text="Delete" clickEvent={()=>deleteUser(x.id!)} /></td>
         <td><ButtonPrimary type="button" text="Edit" clickEvent={()=>launchEditForm(x)} /></td>
       </tr>)}
         
        </tbody>
      </table>
      : <div style={{margin:"50px 0"}} >
      <TitleBar title="Start by Adding Users" subTitle ="No Users other than Admin" />
    </div>
      }
     </Container>
    )
}

export default observer(Users);
