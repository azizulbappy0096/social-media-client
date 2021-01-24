import React, { useState } from "react";
import { Button, CommentAction, Form, Grid } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

// css
import "./css/Register.css";

// form hook
import { useForm } from "../utils/FormHooks";

// mutation
import { loginUser } from "../utils/graphql/userMutation";
// validator
import { loginValidator } from "../utils/validator/userValidator";

// redux-store
import { actionTypes } from "../utils/reducer/authReducer";
import { useDispatch } from "react-redux";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const initialValues = {
    username: "",
    password: "",
  };
  const { values, onChange, onSubmit } = useForm(initialValues, Login);

  const [login, { loading }] = useMutation(loginUser, {
    update: (_, { data: { login } }) => {
      dispatch({
          type: actionTypes.login,
          user: login
      })
    },
    onError: (err) => {
      setErrors({ ...errors, server: err.message.split(": ")[1] });
    },
    variables: values,
    onCompleted: (data) => {
      history.replace("/");
    },
  });

  function Login() {
    const { valid, errors } = loginValidator(values.username, values.password);
    if (valid) {
      setErrors({});
      login();
    } else {
      setErrors(errors);
    }
  }

  return (
    <Form
      error
      onSubmit={onSubmit}
      className={`login__form ${loading ? "loading" : ""}`}
    >
      <Grid>
        <Grid.Row centered style={{ margin: "12px auto" }}>
          <h1> Login Account </h1>
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
        type="password"
        name="password"
        value={values.password}
        error={errors.password ? true : false}
        placeholder="Type Password..."
        onChange={onChange}
      />
      <Button type="submit"> Login </Button>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value, index) => (
              <li key={index}>
                {" "}
                {value ? value : "Unexpected server Error!!"}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
}

export default Login;
