
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel } from "@mui/material";

import { LOGIN_USER } from '../utils/mutations';
import { useForm } from "../utils/helpers";
import { AuthContext } from "../utils/AuthContext";

function Login(props) {
	const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, 
      {
        data: {login: userData}
      }
    ) {
      context.login(userData);
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
    <Grid container sx={{
			display: "flex",
    	flexDirection: "column",
    	alignItems: "center"}}
		>
      <Box component={'form'} onSubmit={onSubmit} noValidate>
        <h1>Login</h1>
        <FormControl
					error={ errors.username || errors.general? true : false }
					fullWidth
					margin="normal"
					variant="standard"
				>
					<InputLabel htmlFor="username">
						Username
					</InputLabel>
					<Input
						placeholder="Username.."
						name="username"
						type="text"
						value={values.username}
						error={ errors.username|| errors.general? true : false }
						onChange={onChange}
					/>
					{ 
						errors.username ? (
							<FormHelperText id="error-username">
								{errors.username}
							</FormHelperText>
						) : (<></>)
					}
					{ 
						errors.general ? (
							<FormHelperText id="error-username">
								{errors.general}
							</FormHelperText>
						) : (<></>)
					}
				</FormControl>
        <FormControl
					error={ errors.password? true : false }
					fullWidth
					margin="normal"
					variant="standard"
				>
					<InputLabel htmlFor="password">
						Password
          </InputLabel>
					<Input
						placeholder="Password.."
						name="password"
						type="password"
						value={values.password}
						error={ errors.password? true : false }
						onChange={onChange}
					/>
					{ 
						errors.password ? (
							<FormHelperText id="error-password">
								{errors.password}
							</FormHelperText>
						) : (<></>)
					}
				</FormControl>
        <Button
          disableRipple
          fullWidth
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </Box>
    </Grid>
  );
}

export default Login;