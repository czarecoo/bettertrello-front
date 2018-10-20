import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<div class="block left">
					<Link className="btn btn-info btn-sm homebtn" to={`/`}>
						<img src="home.png" alt="home" height="25" width="25"></img>
					</Link>
				</div>
				<div class="block center">
					<Link to={`/`}>
						<img className="logo" src="logo.png" alt="logo" height="30" width="170"></img>
					</Link>
				</div>
				<div class="block right">
					<Link className="btn btn-info btn-sm homebtn" to={`/`}>
						<img src="plus.png" alt="plus" height="25" width="25"></img>
					</Link>
				</div>
			</div>
		)
	}
}

export default Header;