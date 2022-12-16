import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect,signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { getFirestore, doc,getDoc,setDoc } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAktCQueWMTJ8BZVKJ3qBWMk0SdwFosTik",
    authDomain: "crowndbapp.firebaseapp.com",
    projectId: "crowndbapp",
    storageBucket: "crowndbapp.appspot.com",
    messagingSenderId: "928519253455",
    appId: "1:928519253455:web:cd2f89dc71b0285e49f6ba"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth,provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>{
    if(!userAuth) return;
    // store user who signed In
    const userDocRef = doc(db,'users', userAuth.uid); //pass in database, collection and identifier
    // console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists()); 
    // if user doesn't exist, create/set doc with data from userAuth in my collection
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            //try to set document
            await setDoc(userDocRef,{
                id: userAuth.uid,
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (err) {
            console.log("error creating user",err.message);
        }
    }
    // check if a user exists. if exists, return userDocRef
    return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email && !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}
export const signInUserWithEmailAndPassword = async (email,password)=>{
    if(!email && !password) return;
    return await signInWithEmailAndPassword(auth, email,password);
}
export const signOutUser = async ()=> await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback)