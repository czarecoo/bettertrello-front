import React from 'react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import App from '../App';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggingIn: true, token: null, cookies: this.props.cookies,
		};
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	componentDidMount() {
		if (this.state.cookies.get("username") !== undefined && this.state.cookies.get("token") !== undefined && this.state.cookies.get("refresh_token") !== undefined) {
			this.setState({
				token: this.state.cookies.get("token")
			});
		}
	}
	login(login, token, refresh_token, expires_in) {
		this.state.cookies.set("username", login, { maxAge: expires_in, path: '/' });
		this.state.cookies.set("token", token, { maxAge: expires_in, path: '/' });
		this.state.cookies.set("refresh_token", refresh_token, { maxAge: expires_in, path: '/' });
		this.setState({
			token: token
		});
	}
	logout() {
		this.state.cookies.remove("username");
		this.state.cookies.remove("token");
		this.state.cookies.remove("refresh_token");
		this.setState({
			token: null
		});
	}

	changeView() {
		this.setState(prevState => ({
			isLoggingIn: !prevState.isLoggingIn
		}));
	}

	render() {
		if (this.state.token !== null) {
			return (
				<App logout={this.logout.bind(this)} />
			)
		} else {
			return (
				<div className="MainView">
					{this.state.isLoggingIn ? <LoginView login={this.login.bind(this)} /> : <RegisterView />}
					<label><input type="radio" checked={!this.state.isLoggingIn} onChange={this.changeView.bind(this)} /> Register </label>{" / "}
					<label><input type="radio" checked={this.state.isLoggingIn} onChange={this.changeView.bind(this)} /> Login </label><br></br>
				</div>
			);
		}
	}
}
export default withCookies(MainView);
