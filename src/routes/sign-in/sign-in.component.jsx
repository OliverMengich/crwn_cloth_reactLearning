import { signInWithGooglePopup,signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
// after user authenticates, store his information on firestore
const SignIn = ()=>{
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        const userDocRef =await createUserDocumentFromAuth(user);
    }
    useEffect(()=>{
        async function fetchData(){
            const res = await getRedirectResult(auth);
            if(res){
                const userDocRef = await createUserDocumentFromAuth(res.user);
            }
        }
        fetchData();
    },[])
    // const logGoogleRedirectUser = async ()=>{
    //     const {user} = await signInWithGoogleRedirect();
    //     console.log(user);
    //     // const userDocRef =await createUserDocumentFromAuth(user);
    // }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser} >SIgn in with GoogleAuthProvider</button>
            <button onClick={signInWithGoogleRedirect} >SIgn in with GoogleRedirect</button>
        </div>
    )
} 
export default SignIn;