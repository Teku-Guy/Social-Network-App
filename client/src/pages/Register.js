import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

import { REGISTER_USER } from "../utils/mutations";
import { useForm } from "../utils/helpers";

function Register() {

	const [errors, setErrors] = useState({}); 

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
    email: '',
    password: ''
  });

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result){
			window.location.assign('/');
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
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={ loading ? 'loading' : '' } >
				<h1>Register</h1>
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
					label= "Email"
					placeholder="Email.."
					name="email"
					type="email"
					value={values.email}
					error={ errors.email? true : false }
					onChange={onChange}
				/>
				<Form.Input
					label= "Password"
					placeholder="Password.."
					name="password"
					type="password"
					value={values.password}
					error={ errors.password? true : false }
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li keys={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
export default Register;