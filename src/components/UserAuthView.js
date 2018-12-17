import React from 'react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axiosInstance from './axiosInstance';

class UserAuthView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggingIn: true, cookies: this.props.cookies,
		};
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	componentDidMount() {
		if (this.state.cookies.get("username") !== undefined && this.state.cookies.get("token") !== undefined && this.state.cookies.get("refresh_token") !== undefined) {
			axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.cookies.get("token");
		}
	}
	login(login, token, refresh_token, expires_in) {
		this.state.cookies.set("username", login, { maxAge: expires_in, path: '/' });
		this.state.cookies.set("token", token, { maxAge: expires_in, path: '/' });
		this.state.cookies.set("refresh_token", refresh_token, { maxAge: expires_in, path: '/' });
		this.props.logIn();
	}

	changeView() {
		this.setState(prevState => ({
			isLoggingIn: !prevState.isLoggingIn
		}));
	}

	render() {
		return (
			<div className="MainView">
				{this.state.isLoggingIn ? <LoginView login={this.login.bind(this)} /> : <RegisterView />}
				<label><input type="radio" checked={!this.state.isLoggingIn} onChange={this.changeView.bind(this)} /> Register </label>{" / "}
				<label><input type="radio" checked={this.state.isLoggingIn} onChange={this.changeView.bind(this)} /> Login </label><br></br>
			</div>
		);

	}
}
export default withCookies(UserAuthView);
