import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withAlert } from 'react-alert';
import axios from 'axios';
import qs from 'qs';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "", password: "", cookies: this.props.cookies,
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
		const data = {
			"grant_type": "password",
			"username": this.state.login,
			"password": this.state.password
		};
		const url = "http://localhost:8080/oauth/token";
		const options = {
			method: 'POST',
			headers: { "Authorisation": "Basic ZnJvbnRlbmQ6c2VjcmV0" },
			data: qs.stringify(data),
			url,
			crossDomain: true,
		};
		axios(options).then((result) => {
			this.props.history.push("/app")
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