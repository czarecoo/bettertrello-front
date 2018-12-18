import React, { Component } from 'react';
import InputMoment from 'input-moment';
import '../../node_modules/input-moment/dist/input-moment.css';
import moment from 'moment';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class CardDeadline extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: "", moment: moment(), notifications: []
		};
	}
	handleChange(data) {
		this.setState({ moment: data });
	};
	toggle(event) {
		if (this.state.popoverOpen === event.target.id || this.state.popoverOpen !== "") {
			this.setState({ popoverOpen: "" });
		}
		else {
			this.setState({ popoverOpen: event.target.id });
		}
	}
	handleSave() {
		var dateTemp;
		try {
			dateTemp = this.state.moment;
		}
		catch (err) {
			console.log(err);
			return;
			//TODO add error alert
		}
		this.setState({ moment: dateTemp, popoverOpen: "" });
		//TODO axios put new date to card
	};
	render() {
		var inputValue;
		//if (this.props.card.deadline !== undefined) {
		if (this.state.moment !== undefined) {
			try {
				//inputValue = this.props.card.deadline.format('DD/MM/YYYY HH:mm');
				inputValue = this.state.moment.format('DD/MM/YYYY HH:mm');
			}
			catch (err) {
				console.log(err);
				//TODO add error alert
				return;
			}
		} else {
			inputValue = "Set deadline";
		}
		return (
			<div className="Deadline">
				<input id="PopoverDate" size="11" className="Observerbtn btn btn-md btn-primary" onClick={this.toggle} type="text" value={inputValue} readOnly />
				<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverDate"} target="PopoverDate" toggle={this.toggle}>
					<PopoverHeader>Choose deadline</PopoverHeader>
					<PopoverBody>
						<InputMoment
							moment={this.state.moment}
							onChange={this.handleChange.bind(this)}
							minStep={5}
							onSave={this.handleSave.bind(this)}
						/>
					</PopoverBody>
				</Popover>

			</div>
		)
	}
}

export default CardDeadline;