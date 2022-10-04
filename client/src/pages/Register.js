
import React, { useState, useContext} from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, Container, FormControl, FormHelperText, Grid, Input, InputLabel } from "@mui/material";

import { REGISTER_USER } from "../utils/mutations";
import { useForm } from "../utils/helpers";
import { AuthContext } from "../utils/AuthContext";

function Register() {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({}); 

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
    email: '',
    password: ''
  });

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: {register: userData} }){
			context.login(userData);
		},
		onError(err){
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		variables: values
	});

	function registerUser(){
		addUser();
	}

	return (
		<Container maxWidth="md" sx={{ p:3 }}>
		<Grid container sx={{
			display: "flex",
    	flexDirection: "column",
    	alignItems: "center"}}
		>
			<Box
				component={'form'}
				onSubmit={onSubmit}
				noValidate
				autoComplete="off"
				sx={{ p: 2}}
			>
				<h1>Register</h1>
				<FormControl
					error={ errors.username? true : false }
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
						error={ errors.username? true : false }
						onChange={onChange}
					/>
					{ 
						errors.username ? (
							<FormHelperText id="error-username">
								{errors.username}
							</FormHelperText>
						) : (<></>)
					}
				</FormControl>
				<FormControl 
						error={ errors.email? true : false } 
						fullWidth 
						margin="normal" 
						variant="standard"
				>
					<InputLabel htmlFor="email">
						Email
          </InputLabel>
					<Input
						placeholder="Email.."
						name="email"
						type="email"
						value={values.email}
						error={ errors.email? true : false }
						onChange={onChange}
					/>
					{ 
						errors.email ? (
							<FormHelperText id="error-email">
								{errors.email}
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
					Join
				</Button>
			</Box>
		</Grid>
		</Container>
	);
}
export default Register;