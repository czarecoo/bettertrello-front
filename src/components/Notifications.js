import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import BoardActivity from './BoardActivity';

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
	componentWillUnmount() {
		clearInterval(this.interval);
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
		if (this.state.notifications !== null && this.state.notifications !== undefined && this.state.notifications.length > 0) {
			return (
				<div className="notificationsContent">
					{this.state.notifications.map((notification, index) =>
						<BoardActivity className="width" key={index} activity={notification} />
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