
import React, { useState, useContext} from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

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

	const [addUser] = useMutation(REGISTER_USER, {
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
		<Container maxWidth="md" sx={{ p: 3 }}>
			<Grid container sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}} grow>
				<Paper elevation={3} sx={{ p: 3, minWidth: 350 }}>
					<Box
						component={'form'}
						onSubmit={onSubmit}
						noValidate
						autoComplete="off"
						sx={{ p: 2 }}
					>
						<Typography variant="h4" align="center" gutterBottom>
							Register
						</Typography>
						<Stack spacing={2} sx={{ mt: 1 }}>
							<TextField
								id="username"
								label="Username"
								name="username"
								placeholder="Username.."
								value={values.username}
								onChange={onChange}
								fullWidth
								variant="standard"
								error={Boolean(errors?.username)}
								helperText={errors?.username || ''}
								autoComplete="username"
							/>

							<TextField
								id="email"
								label="Email"
								name="email"
								placeholder="Email.."
								type="email"
								value={values.email}
								onChange={onChange}
								fullWidth
								variant="standard"
								error={Boolean(errors?.email)}
								helperText={errors?.email || ''}
								autoComplete="email"
							/>

							<TextField
								id="password"
								label="Password"
								name="password"
								placeholder="Password.."
								type="password"
								value={values.password}
								onChange={onChange}
								fullWidth
								variant="standard"
								error={Boolean(errors?.password || errors?.general)}
								helperText={errors?.password || errors?.general || ''}
								autoComplete="current-password"
							/>
						</Stack>
						<Button
							disableRipple
							fullWidth
							variant="contained"
							type="submit"
							sx={{ mt: 3 }}
						>
							Join
						</Button>
					</Box>
				</Paper>
			</Grid>
		</Container>
	);
}
export default Register;