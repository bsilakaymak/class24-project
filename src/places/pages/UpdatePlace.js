import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./NewPlace.css";
import { useForm } from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Bilding",
    description: "Very famous building",
    imageURL:
      "https://aws-tiqets-cdn.imgix.net/images/content/1e74453a4d2c45f9becb39add27f2dff.jpg?auto=format&fit=crop&ixlib=python-1.1.2&q=25&s=b720cbf5ab86e1786ee7bd2a6b4f26be&w=400&h=320&dpr=2.625",
    address: "20 W somewhere NY",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u1"
  },
  {
    id: "p2",
    title: "Empire State Bilding",
    description: "Very famous building",
    imageURL:
      "https://aws-tiqets-cdn.imgix.net/images/content/1e74453a4d2c45f9becb39add27f2dff.jpg?auto=format&fit=crop&ixlib=python-1.1.2&q=25&s=b720cbf5ab86e1786ee7bd2a6b4f26be&w=400&h=320&dpr=2.625",
    address: "20 W somewhere NY",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u1"
  },
  {
    id: "p3",
    title: "Empire State Bilding",
    description: "Very famous building",
    imageURL:
      "https://aws-tiqets-cdn.imgix.net/images/content/1e74453a4d2c45f9becb39add27f2dff.jpg?auto=format&fit=crop&ixlib=python-1.1.2&q=25&s=b720cbf5ab86e1786ee7bd2a6b4f26be&w=400&h=320&dpr=2.625",
    address: "20 W somewhere NY",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u2"
  }
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
  const [isLoading, setLoading] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );
  useEffect(() => {
    if(identifiedPlace){
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    
    setLoading(false)
  }, [identifiedPlace, setFormData]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Place Not Found</h2>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="desciption"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(20)]}
        errorText="Enter a valid description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update
      </Button>
    </form>
  );
};

export default UpdatePlace;
