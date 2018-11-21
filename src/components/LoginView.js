import React from 'react';
import { withAlert } from 'react-alert';
import axiosInstance from './axiosInstance';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: 'admin', password: '@admin@',
		};
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	login() {
		if (this.state.login === "" || this.state.password === "") {
			this.props.alert.error('Login and password field cannot be empty');
		} else {
			const data = new FormData();
			data.append('grant_type', 'password');
			data.append('username', this.state.login);
			data.append('password', this.state.password);
			var session_url = '/oauth/token';
			axiosInstance.post(session_url, data, {
				auth: {
					username: "frontend",
					password: "secret"
				}
			}).then((result) => {
				console.log(result);
				if (result.status === 200) {
					axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.access_token;
					this.props.login(this.state.login, result.data.access_token, result.data.refresh_token, result.data.expires_in)
				} else {
					this.props.alert.error('Login failed');
				}
			}).catch((error) => {
				console.log(error);
				this.props.alert.error('Login failed');
			});
		}
	}

	render() {
		return (
			<div className="LoginView">
				<h1>Log in</h1>
				Login:<br></br>
				<input placeholder="Enter your login" name="login" type="text" value={this.state.login} onChange={this.handleChange.bind(this)} /><br></br>
				Password:<br></br>
				<input placeholder="Enter your password" name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)} /><br></br>
				<button type="submit" onClick={this.login.bind(this)}>Log in!</button>
			</div>
		);
	}
}
export default withAlert(LoginView);