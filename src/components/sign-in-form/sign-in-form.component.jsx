import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword  } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFields = {
    email: '',
    password: '',
   
}

const SignInForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;
    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    }
    const signInWithGoogle = async ()=>{
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        await createUserDocumentFromAuth(user);
    }
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        try {
            const  response = await signInUserWithEmailAndPassword(email,password);
            console.log(response);
            resetFormFields(defaultFormFields);
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password')
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email')
                    break;  
                default:
                    console.log("Error",err);
                    break;
            }
        }
    }
    return(
        <div className="sign-up-container">
            <h2>Already have an account? </h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleFormSubmit}>
                <FormInput label="Email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    type="email"
                    value={email} />
                <FormInput label="Password" 
                    required 
                    onChange={handleChange} 
                    name="password"
                    type="password" 
                    value={password} />
                {/* <button type="submit">Sign Up</button> */}
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Sign IN with Google</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm;