import React from 'react';
import BoardsView from './components/BoardsView';
import Header from './components/Header';
import UserAuthView from './components/UserAuthView';
import Create from './components/Create';
import Board from './components/Board';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axiosInstance from './components/axiosInstance';
import { Router, Route } from 'react-router-dom';
import history from './components/history';
import { CookiesProvider } from 'react-cookie';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false, cookies: this.props.cookies,
		};
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	componentDidMount() {
		if (this.state.cookies.get("username") !== undefined && this.state.cookies.get("token") !== undefined && this.state.cookies.get("refresh_token") !== undefined) {
			this.setState({ isLoggedIn: true });
			axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.cookies.get("token");
		}
	}

	logOut() {
		this.setState({ isLoggedIn: false });
		axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.cookies.get("token");
		this.state.cookies.remove("username");
		this.state.cookies.remove("token");
		this.state.cookies.remove("refresh_token");
	}
	logIn() {
		this.setState({ isLoggedIn: true });
	}

	render() {
		return (
			<Router history={history}>
				<div className="routerDiv">
					<Header isLoggedIn={this.state.isLoggedIn} logOut={this.logOut.bind(this)} />
					<CookiesProvider>
						<Route exact path='/' render={props => this.state.isLoggedIn ? <BoardsView /> : <UserAuthView logIn={this.logIn.bind(this)} />} />
						<Route path='/create' component={Create} />
						<Route path='/board/:id' component={Board} />
					</CookiesProvider>
				</div>
			</Router >
		);
	}
}
export default withCookies(App);
