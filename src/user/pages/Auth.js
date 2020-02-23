import React, { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/contexts/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false }
  });

  const [loginMode, setLoginMode] = useState(true);
  const switchModeHandler = () => {
    if (!loginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: " ",
            isValid: false
          }
        },
        false
      );
    }
    setLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };
  return (
    <Card className="authentication">
      <form onSubmit={authSubmitHandler}>
        {!loginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter a valid name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Enter a valid e-mail"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Enter a valid password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {loginMode ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {loginMode ? "Sign Up" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
