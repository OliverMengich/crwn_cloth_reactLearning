import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
// after user authenticates, store his information on firestore
const SignIn = ()=>{
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        const userDocRef =await createUserDocumentFromAuth(user);

    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser} >SIgn in with GoogleAuthProvider</button>
        </div>
    )
} 
export default SignIn;