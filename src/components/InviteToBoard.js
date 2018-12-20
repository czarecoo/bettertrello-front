import React, { Component } from 'react';
import axiosInstance from './axiosInstance';

class InviteToBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUserName: ""
		};
	}
	inviteUser() {
		///boards/{id}/users/{username}
		if (this.state.newUserName !== "") {
			axiosInstance.post('/boards/' + this.props.board.id + '/users/' + this.state.newUserName)
				.then(res => {
					if (res.status !== 200 && res.status === 201) {
						console.log(res);
					}
				}).catch((err) => console.log(err));
			this.setState({ newUserName: "" });
		}
	}
	onChange(event) {
		this.setState({ newUserName: event.target.value });
	}
	render() {
		return (
			<div className="InviteToBoard">
				<input size="12" onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); this.inviteUser(); } }} placeholder="Enter username" name="newUserName" type="text" value={this.state.newUserName} onChange={this.onChange.bind(this)} />
				<button className="btn btn-md btn-primary" onClick={this.inviteUser.bind(this)}>Invite user</button>
			</div>
		)
	}
}

export default InviteToBoard;