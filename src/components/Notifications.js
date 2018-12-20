import React, { Component } from 'react';
import axiosInstance from './axiosInstance';

class Notifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: []
		};
	}
	componentDidMount() {
		this.getNotifications();
		this.interval = setInterval(() => { this.getNotifications() }, 2000);
	}
	getNotifications() {
		axiosInstance.get('/user/')
			.then(res => {
				if (res.data !== null && res.data !== undefined && res.data.notifications !== null &&
					res.data.notifications !== undefined && res.data.notifications.length > 0) {
					this.setState({ notifications: res.data.notifications });
				}
			}).catch((err) => {
				console.log(err);
			});
	}
	render() {
		if (this.props.notifications !== null && this.props.notifications !== undefined && this.props.notifications.length > 0) {
			return (
				<div className="notificationsContent">
					{this.state.notifications.map((notification, index) =>
						<div key={index}>
							{notification}
						</div>
					)}
				</div>
			)
		} else {
			return (
				"No new notifications."
			)
		}
	}

}


export default Notifications;