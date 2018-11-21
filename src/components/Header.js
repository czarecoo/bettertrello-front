import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import home from './home.png';
import logo from './logo.png';
import plus from './plus.png';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axiosInstance from './axiosInstance';

class Header extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	logout() {
		axiosInstance.defaults.headers.common['Authorization'] = '';
		this.props.cookies.remove("username");
		this.props.cookies.remove("token");
		this.props.cookies.remove("refresh_token");
	}
	render() {
		if (this.props.cookies.get("username") !== undefined && this.props.cookies.get("token") !== undefined && this.props.cookies.get("refresh_token") !== undefined) {
			return (
				<div className="header">
					<div className="block left">
						<Link className="btn btn-info btn-sm homebtn" to={`/`}>
							<img src={home} alt="home" height="25" width="25"></img>
						</Link>
					</div>
					<div className="block center">
						<Link to={`/`}>
							<img className="logo" src={logo} alt="logo" height="30" width="170"></img>
						</Link>
					</div>
					<div className="block right">
						<Link className="btn btn-info btn-sm homebtn" to={`/create`}>
							<img src={plus} alt="plus" height="25" width="25"></img>
						</Link>
						<Link className="btn btn-info btn-sm homebtn" to={`/`} >
							<div onClick={() => this.logout()}>Logout</div>
						</Link>
					</div>
				</div>
			)
		} else {
			return (
				<div className="header">
					<div className="block left">

					</div>
					<div className="block center">
						<Link to={`/`}>
							<img className="logo" src={logo} alt="logo" height="30" width="170"></img>
						</Link>
					</div>
					<div className="block right">

					</div>
				</div>
			)
		}
	}


}

export default withCookies(Header);