import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import { Grid, TextField } from "@mui/material";
import { useForm, Form } from "../../components/form-input/useForm";
import Input from "../../components/form-input/Input";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const initialFValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  //非google login
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    try {
      const { user } = await signInWithGooglePopup();
      //登入後抓出google回傳之user info
      resetForm();
      navigate("/");
    } catch (error) {}
  };

  //從 useForm 那邊會回傳這五個變數 或 funcs
  const { values, handleInputChange, errors, setErrors, resetForm } = useForm(
    initialFValues
  );

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    if ("email" in fieldValues)
      if (!temp.email)
        temp.email = fieldValues.email ? "" : "This field is required.";
      else
        temp.email = /$^|.+@.+..+/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    //console.log("errors", temp);
    setErrors({
      ...temp,
    });

    //如果每個 fieldValues 都是 "", 因為初始值是"", 代表所有field都是合法, 就會 return T
    if (fieldValues === values)
      return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { user } = await signInAuthUserWithEmailAndPassword(
          values.email,
          values.password
        ); //登入後抓出google回傳之user info
        resetForm();
        navigate("/");
      } catch (error) {}
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item container>
            <Grid item xs={12}>
              <Input
                name="email"
                label="Email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <Input
                name="password"
                label="Password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
              />
            </Grid>
            <ButtonsContainer>
              <Button type="submit">Sign In</Button>
              <Box sx={{ marginLeft: 2 }}></Box>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.google}
                type="button"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </Button>
            </ButtonsContainer>
          </Grid>
        </Grid>
      </Form>
    </SignInContainer>
  );
};

export default SignInForm;
