import React from 'react'
import { useStore } from '../../Store/store'
import TitleBar from '../../UI/TitleBar/TitleBar'

export default function Dashboard() {

    const {userStore} = useStore();

    return (
        <div style={{margin:"200px 0"}} >
            <TitleBar subTitle={userStore.isLoggedIn?`Please Proceed`:"Please Login"} title="Welcome" />
        </div>
    )
}
