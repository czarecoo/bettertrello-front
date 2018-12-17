import React from 'react';
import { Link } from 'react-router-dom';
import home from './home.png';
import logo from './logo.png';
import plus from './plus.png';
import logout from './logout.png';
import notifications from './notifications.png';
import Notifications from './Notifications';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: false, notifications: []
		};
	}

	toggle() {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		});
	}
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
						<button id="Popover1" onClick={this.toggle} className="btn btn-info btn-sm homebtn">
							<img src={notifications} alt="notifications" height="25" width="25"></img>
						</button>
						<Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
							<PopoverHeader>Notifications</PopoverHeader>
							<PopoverBody>
								<Notifications />
							</PopoverBody>
						</Popover>

						<Link onClick={() => this.props.logOut()} className="btn btn-info btn-sm homebtn" to={`/`} >
							<img src={logout} alt="logout" height="25" width="25"></img>
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