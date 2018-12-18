import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class CardDeleteButton extends Component {
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

	}
	render() {
		return (
			<div className="deleteCard">
				<button id="PopoverDeleteCard" className="Observerbtn btn btn-md btn-primary" onClick={this.toggle.bind(this)} >Delete</button>
				<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverDeleteCard"} target="PopoverDeleteCard" toggle={this.toggle.bind(this)}>
					<PopoverHeader>Delete card</PopoverHeader>
					<PopoverBody>
						<div>Are you sure you'd like to delete this card?</div>
						<button className="btn btn-md btn-primary btn-danger" onClick={this.delete.bind(this)}>Delete</button>
					</PopoverBody>
				</Popover>

			</div>
		)
	}
}

export default CardDeleteButton;