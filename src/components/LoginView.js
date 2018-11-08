import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withAlert } from 'react-alert';
import axios from 'axios';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "admin", password: "@admin@", cookies: this.props.cookies,
		};
	}

	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	handleUpdate(dataFromServer) {
		if (this.state.isLoggingIn === false) {
			this.state.cookies.set("login", dataFromServer.login, { maxAge: 3600 * 24, path: '/' });
			this.state.cookies.set("userId", dataFromServer.userId, { maxAge: 3600 * 24, path: '/' });
			this.state.cookies.set("sessionId", dataFromServer.sessionId, { maxAge: 3600 * 24, path: '/' });
			this.setState({
				isLoggingIn: true,
			});
		}
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	login() {
		const options = {
			method: "POST",
			data: {
				"grant_type": "password",
				"username": this.state.login,
				"password": this.state.password
			},
			withCredentials: true,
			auth: {
				username: 'frontend',
				password: 'secret'
			},
			headers: {
				'Authorization': 'Basic ZnJvbnRlbmQ6c2VjcmV0',
				'Accept': 'application/json',
				'Content-Type': 'application/from-data',
			},
			url: "http://localhost:8080/oauth/token",
		};
		axios(options)
			.then((result) => {
				console.log(result);
				this.props.history.push("/app")
			}).catch(function (error) {
				console.log(error);
			});
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
export default withAlert(withCookies(LoginView));