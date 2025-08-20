import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
  Container
} from "@mui/material";

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

  const [loginUser] = useMutation(LOGIN_USER, {
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

	<Container  maxWidth="md" sx={{ p:3 }}>
    <Grid
      container
      direction="row"
      sx={{
		justifyContent: "center",
		alignItems: "center",
	  }}
    >
      <Grid size={{ xs: 12, sm: 8, md: 4, lg: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box component="form" onSubmit={onSubmit} noValidate>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <FormControl
              error={Boolean(errors.username || errors.general)}
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
                error={Boolean(errors.username || errors.general)}
                onChange={onChange}
              />
              {errors.username && (
                <FormHelperText>{errors.username}</FormHelperText>
              )}
              {errors.general && (
                <FormHelperText>{errors.general}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              error={Boolean(errors.password)}
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
                error={Boolean(errors.password)}
                onChange={onChange}
              />
              {errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <Button
              disableRipple
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
	</Container>
  );
}

export default Login;