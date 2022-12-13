import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword } = formFields;
    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    }
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
       // confirm password matched
        if(password !== confirmPassword){
            alert('PASSWORD DONT MATCH');
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            const response = await createUserDocumentFromAuth(user,{displayName})
            resetFormFields();
            console.log(response);
        } catch (err) {
            if(err.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else{

                console.error('error encountered: ',err.message);
            }
        }
        //check if user is auth
        // create a user Doc
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account? </h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handleFormSubmit}>
                <FormInput 
                    label="Display Name" 
                    required 
                    type="text"
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} />
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
                <FormInput label="Confirm Password" 
                    required 
                    onChange={handleChange} 
                    name="confirmpassword"
                    type="password" 
                    value={confirmPassword} />
                {/* <button type="submit">Sign Up</button> */}
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm;