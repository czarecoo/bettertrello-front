import React, { Component } from 'react';
//import axiosInstance from './axiosInstance';

class Notifications extends Component {
	/*addComment() {
		var array;
		if (this.props.card.activities !== undefined && this.props.card.activities !== null) {
			array = this.props.card.activities;
		} else {
			array = [];
		}

		if (this.state.comment !== '') {
			this.setState({ comment: "" });
			array.push({ data: this.state.comment });
			axiosInstance.patch('/cards/' + this.props.card.id, {
				"activities": array
			})
				.then((result) => {
					if (result.status !== 200 && result.status !== 201) {
						this.props.alert.error('Commenting failed');
					}
				}).catch(() => {
					this.props.alert.error('Commenting failed');
				});
		} else {
			this.props.alert.error("Cannot create empty comment");
		}
	}*/
	render() {
		if (this.props.notifications !== undefined && this.props.notifications.length > 0) {
			return (
				<div className="notificationsContent">
					{this.props.notifications.map((notification, index) =>
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