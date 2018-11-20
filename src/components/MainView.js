import React from 'react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import App from '../App';

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggingIn: true, isLoggedIn: false
		};
	}

	login() {
		this.setState({
			isLoggedIn: true
		});
	}
	logout() {
		this.setState({
			isLoggedIn: false
		});
	}

	changeView() {
		this.setState(prevState => ({
			isLoggingIn: !prevState.isLoggingIn
		}));
	}

	render() {
		if (this.state.isLoggedIn === true) {
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
export default MainView;
