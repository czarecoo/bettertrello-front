import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';
import history from './history';

class BoardDeleteButton extends Component {
	constructor(props) {
		super(props);
		this.state = { popoverOpen: "" };
	}
	toggle(event) {
		if (this.state.popoverOpen === event.target.id || this.state.popoverOpen !== "") {
			this.setState({ popoverOpen: "" });
		}
		else {
			this.setState({ popoverOpen: event.target.id });
		}
	}
	delete() {
		axiosInstance.patch('/boards/' + this.props.board.id, { "isArchived": true })
			.then((result) => {
				if (result.status !== 200 && result.status !== 201) {
					this.props.alert.error('Deleting board failed');
					console.log(result);
				} else {
					history.push("/");
				}
			}).catch((err) => {
				this.props.alert.error('Deleting board failed');
				console.log(err);
			});
		this.setState({ popoverOpen: "" });

	}
	render() {
		return (
			<div className="deleteCard">
				<button id="PopoverDeleteBoard" className="Observerbtn btn btn-md btn-primary" onClick={this.toggle.bind(this)} >Delete</button>
				<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverDeleteBoard"} target="PopoverDeleteBoard" toggle={this.toggle.bind(this)}>
					<PopoverHeader>Delete board</PopoverHeader>
					<PopoverBody>
						<div>Are you sure you'd like to delete this board?</div>
						<button className="btn btn-md btn-primary btn-danger" onClick={this.delete.bind(this)}>Delete</button>
					</PopoverBody>
				</Popover>

			</div>
		)
	}
}

export default withAlert(BoardDeleteButton);