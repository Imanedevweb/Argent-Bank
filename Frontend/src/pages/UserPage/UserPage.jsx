import React from "react";
import '../UserPage/UserPage.scss';
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser'
import AccountSection from '../../components/AccountSection/AccountSection';

function User (){
return (
    <main className="bg-dark">
        <WelcomeUser />
        <>
        <AccountSection />
        </>
        

    
    </main>
    )
}

export default User;