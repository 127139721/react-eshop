import React, {useState, useContext, Component} from 'react'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { UserContext } from '../../contexts/user.context';


//宣告物件給 input fileds 使用
const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    //上面宣告之物件搭配 useState hook 設定給 input fileds 使用
    const [formFields, setFormFields] = useState(defaultFormFields);
    //從 formFields de-constructing 取值
    const {email, password} = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //非re-direct login
    const signInWithGoogle  = async() => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    //按下建立 user
    const handleSubmit = async(event) => {
       event.preventDefault();
       try{
            const { user } = await signInAuthUserWithEmailAndPassword(email, password); //登入後抓出google回傳之user info
            setCurrentUser(user); //透過 context 回設
            resetFormFields();
       }
       catch(error){
           
       }
    }

    const handleChange = (event) => {
        //從event.target 取出 name & value 就是下面input給的 name="" & value=""
        const {name, value} = event.target;
        //使用 useState hook 的 setFormFields 把 value 設定回對應的 name field in formFields
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/*handleChange 搭配 name field, ex.name="displayName" 之後才有辦法判斷是哪一個 input 被觸發 */}
                {/*value={displayName} 需要跟上面的obj name 對應這樣才會顯示哪個 obj 的值 */}
                <FormInput 
                    label="Emial" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" value={password}
                />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>
                        Sign In With Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;