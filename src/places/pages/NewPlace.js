import React from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Button from '../../shared/components/FormElements/Button';
import {useForm} from '../../shared/hooks/form-hook'


const NewPlace = props => {
    const[formState, inputHandler]  =useForm(
        {
          title: {
            value: "",
            isValid: false
          },
          description: {
            value: "",
            isValid: false
          },
          address: {
            value: "",
            isValid: false
          }
        },
        false
      );

   const placeSubmitHandler = e =>{
       e.preventDefault();
       //send the data to server later when we do backend
       console.log(formState.inputs);
   }
  
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        errorText="Please enter a valid input"
        validators={[VALIDATOR_REQUIRE()]}
        onInput = {inputHandler}
      />
       <Input
        id="description"
        label="Description"
        element="textarea"
        errorText="Please enter a valid input at least 20 characters"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(20)]}
        onInput = {inputHandler}
      />
      <Input
        id="address"
        label="Address"
        element="input"
        errorText="Please enter a valid address"
        validators={[VALIDATOR_REQUIRE()]}
        onInput = {inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>Add Place</Button>
    </form>
  );
};

export default NewPlace;
