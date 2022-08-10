import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

import { LOGIN_USER } from '../utils/mutations';
import { useForm } from "../utils/helpers";
import Auth from '../utils/auth';

function Login(props) {
	const user = Auth.loggedIn();
	if(user){
		window.location.assign('/');
	}

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, 
      {
        data
      }
    ) {
			console.log(data.login.token)
      Auth.login(data.login.token);
    },
    onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
					label= "Username"
					placeholder="Username.."
					name="username"
					type="text"
					value={values.username}
					error={ errors.username? true : false }
					onChange={onChange}
				/>
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;