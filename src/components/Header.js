import React from 'react';
import { Link } from 'react-router-dom';
import home from './home.png';
import logo from './logo.png';
import plus from './plus.png';
import user from './user.png';
import logout from './logout.png';
import notifications from './notifications.png';
import Notifications from './Notifications';
import Create from './Create';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: "", notifications: []
		};
	}
	toggle(event) {
		if (this.state.popoverOpen === event.target.id || this.state.popoverOpen !== "") {
			this.setState({ popoverOpen: "" });
		}
		else {
			this.setState({ popoverOpen: event.target.id });
		}
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
						<button id="PopoverCreate" onClick={this.toggle} className="btn btn-info btn-sm homebtn" to={`/create`}>
							<img src={plus} alt="plus" height="25" width="25"></img>
						</button>
						<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverCreate"} target="PopoverCreate" toggle={this.toggle}>
							<PopoverHeader>Create board</PopoverHeader>
							<PopoverBody>
								<Create />
							</PopoverBody>
						</Popover>
						<button id="PopoverNotifications" onClick={this.toggle} className="btn btn-info btn-sm homebtn">
							<img src={notifications} alt="notifications" height="25" width="25"></img>
						</button>
						<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverNotifications"} target="PopoverNotifications" toggle={this.toggle}>
							<PopoverHeader>Notifications</PopoverHeader>
							<PopoverBody>
								<Notifications notifications={this.state.notifications} />
							</PopoverBody>
						</Popover>

						<button id="PopoverUser" onClick={this.toggle} className="btn btn-info btn-sm homebtn">
							<img src={user} alt="user" height="25" width="25"></img>
						</button>
						<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverUser"} target="PopoverUser" toggle={this.toggle}>
							<PopoverHeader>User panel</PopoverHeader>
							<PopoverBody>
								<Link onClick={() => this.props.logOut()} to={`/`} >
									Logout
								</Link>
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