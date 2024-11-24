import '../SignInPage/SignInPage.scss';
import SignInForm from "../../components/SignInForm/SignInForm";


const SignInPage = () => {
    console.log ("SignInPage rendered");// ceci est pour tester si le composant est bien rendu
   

    return (
    <>
       
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <SignInForm />
            </section>
        </main>
    </>
);
};

export default SignInPage;