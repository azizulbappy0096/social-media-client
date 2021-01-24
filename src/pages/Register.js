import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom"

// css
import "./Register.css";

// form hook
import { useForm } from "../utils/FormHooks";

// mutation
import { registerUser } from "../utils/graphql/userMutation";
// validator
import { registerValidator } from "../utils/validator/userValidator";

function Register() {
    const history = useHistory();
  const [errors, setErrors] = useState({});
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { values, onChange, onSubmit } = useForm(initialValues, register);

  const [addUser, { loading }] = useMutation(registerUser, {
    update: (_, response) => {
      console.log("response", response);
    },
    onError: (err) => {
      setErrors({ ...errors, server: err.message.split(": ")[1] });
    },
    variables: values,
    onCompleted: (data) => {
        history.push("/")
    }
  });

  function register() {
    const { valid, errors } = registerValidator(
      values.username,
      values.email,
      values.password,
      values.confirmPassword
    );
    if (valid) {
      setErrors({});
      addUser();
    } else {
      setErrors(errors);
    }
  }

  return (
    <Form error onSubmit={onSubmit} className={`register__form ${loading ? "loading" : ""}`}>
      <Grid>
        <Grid.Row centered style={{ margin: "12px auto" }}>
          <h1> Register Account </h1>
        </Grid.Row>
      </Grid>
      <Form.Input
        type="text"
        name="username"
        value={values.username}
        error={errors.username ? true : false}
        placeholder="Type username..."
        onChange={onChange}
      />
      <Form.Input
        type="text"
        name="email"
        value={values.email}
        error={errors.email ? true : false}
        placeholder="Type E-mail..."
        onChange={onChange}
      />
      <Form.Input
        type="password"
        name="password"
        value={values.password}
        error={errors.password ? true : false}
        placeholder="Type Password..."
        onChange={onChange}
      />
      <Form.Input
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        error={errors.confirmPassword ? true : false}
        placeholder="Repeat password..."
        onChange={onChange}
      />
      <Button type="submit"> Register </Button>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}> {value ? value : "Unexpected server Error!!"} </li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
}

export default Register;
