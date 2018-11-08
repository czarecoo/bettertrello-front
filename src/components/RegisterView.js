import React from 'react';
import { withAlert } from 'react-alert';
import axios from 'axios';

class RegisterView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "", password: ""
		};
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	register() {
		const { login, password } = this.state;
		if (login === "" || password === "") {
			this.props.alert.error('Login and password field cannot be empty');
		} else {
			axios.post('http://localhost:8080/users', {
				"username": login,
				"password": password
			})
				.then((result) => {
					if (result.status === 201) {
						this.props.alert.success('Successfully created user ' + login);
					} else {
						if (result.statusText !== null && result.statusText !== undefined && result.statusText !== "") {
							this.props.alert.error('Error: ' + result.statusText);
						} else {
							this.props.alert.error('Unknown error');
						}

					}
				});
		}

	}

	render() {
		return (
			<div className="RegisterView">
				<h1>Register</h1>
				Login:<br></br>
				<input placeholder="Enter your desired login" name="login" type="text" value={this.state.login} onChange={this.handleChange.bind(this)} /><br></br>
				Password:<br></br>
				<input placeholder="Enter your desired password" name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)} /><br></br>
				<button type="submit" onClick={this.register.bind(this)}>Register!</button>
			</div>
		);
	}
}
export default withAlert(RegisterView);