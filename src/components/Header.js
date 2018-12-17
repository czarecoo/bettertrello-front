import React from 'react';
import { Link } from 'react-router-dom';
import home from './home.png';
import logo from './logo.png';
import plus from './plus.png';

class Header extends React.Component {
	render() {
		if (this.props.isLoggedIn) {
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
						<Link onClick={() => this.props.logOut()} className="btn btn-info btn-sm homebtn" to={`/`} >
							<div>Logout</div>
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

export default Header;