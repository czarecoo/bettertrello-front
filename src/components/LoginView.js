import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withAlert } from 'react-alert';
import axios from 'axios';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: 'admin', password: '@admin@', cookies: this.props.cookies,
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
		const data = new FormData();
		data.append('grant_type', 'password');
		data.append('username', this.state.login);
		data.append('password', this.state.password);
		var session_url = 'http://localhost:8080/oauth/token';
		axios.post(session_url, data, {
			auth: {
				username: "frontend",
				password: "secret"
			}
		}).then((result) => {
			console.log(result);
			if (result.status === 200) {
				this.props.login()
			}
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