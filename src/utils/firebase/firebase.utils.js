import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect,signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { getFirestore, doc,getDoc,setDoc, collection, writeBatch,query,getDocs } from 'firebase/firestore';
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
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef = collection(db, collectionKey);
    //a batch is a group of writes that can be committed together
    // it adds documents in form of a transaction
    const batch = writeBatch(db); // we instanciate a batch and pass in the database
    // iterate through the objectsToAdd
    objectsToAdd.forEach(obj=>{
        // for each of the objects, batchset the document
        const newDocRef = doc(collectionRef,obj.title.toLowerCase());
        //we pass in the collectionRef and the title of the object
        batch.set(newDocRef,obj); //firebase will now point to the newDocRef
    });
    await batch.commit();
    console.log('Batch committed');
}
export const getCategoriesAndDocuments = async ()=>{
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef); //generate a query
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,doc)=>{
        const {title, items} = doc.data();
        acc[tite.toLowerCase()] = items;
        return acc;
    },{});
    return categoryMap;
}
export const createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>{
    if(!userAuth) return;
    // store user who signed In
    const userDocRef = doc(db,'users', userAuth.uid); //pass in database, collection and identifier
    // console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log('User exists ? ',userSnapshot.exists()); 
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
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);