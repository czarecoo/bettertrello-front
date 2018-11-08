import React from 'react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggingIn: false, cookies: this.props.cookies,
		};
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	componentDidMount() {
		//SocketManager.rejoinSession(this.state.cookies.get("login"), this.state.cookies.get("userId"), this.state.cookies.get("sessionId"));
	}

	changeView() {
		this.setState(prevState => ({
			isLoggingIn: !prevState.isLoggingIn
		}));
	}

	render() {
		return (
			<div className="MainView">
				{this.state.isLoggingIn ? <LoginView /> : <RegisterView />}
				<label><input type="radio" checked={!this.state.isLoggingIn} onChange={this.changeView.bind(this)} /> Register </label>{" / "}
				<label><input type="radio" checked={this.state.isLoggingIn} onChange={this.changeView.bind(this)} /> Login </label><br></br>
			</div>
		);
	}
}
export default withCookies(MainView);
