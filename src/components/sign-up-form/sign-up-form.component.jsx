import {useState, useContext} from 'react'
import React from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

//宣告物件給 input fileds 使用
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    //上面宣告之物件搭配 useState hook 設定給 input fileds 使用
    const [formFields, setFormFields] = useState(defaultFormFields);
    
    //從 formFields de-constructing 取值
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //按下建立 user
    const handleSubmit = async(event) => {
       event.preventDefault();

       if(password !== confirmPassword){
            alert('passwords do not match');
            return;
       }

       try{
            //使用email, password 建立 a user, 注意這裡只會回傳一個 user credential, 不會真正去建立 a user in our document
            const { user } = await createAuthUserWithEmailAndPassword(email, password); 
            //用上面回傳的 a user credential 真正去建立 a user into our document.(para1.user: user credential & para2.{displayName}: user name)
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
       }
       catch(error){
          if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
          } else {
            console.log('user creation encountered an error', error);
          }
       }
    }

    const handleChange = (event) => {
        //從event.target 取出 name & value 就是下面input給的 name="" & value=""
        const {name, value} = event.target;
        //使用 useState hook 的 setFormFields 把 value 設定回對應的 name field in formFields
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/*handleChange 搭配 name field, ex.name="displayName" 之後才有辦法判斷是哪一個 input 被觸發 */}
                {/*value={displayName} 需要跟上面的obj name 對應這樣才會顯示哪個 obj 的值 */}
                <FormInput 
                    label="Display Name" 
                    type="text" required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <FormInput 
                    label="Emial" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;