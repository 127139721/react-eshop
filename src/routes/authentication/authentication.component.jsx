import React from 'react';

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { SignInAndSignUpContainer } from './authentication.styles';


const Authentication = () => {
    return(
        <SignInAndSignUpContainer>
            <SignInForm />
            <SignUpForm />
        </SignInAndSignUpContainer>
    )
}

export default Authentication