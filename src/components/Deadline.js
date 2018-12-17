import React, { Component } from 'react';
import InputMoment from '../../node_modules/input-moment';
import '../../node_modules/input-moment/dist/input-moment.css';
import moment from 'moment';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class Deadline extends Component {
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
	/*handleSave = () => {
		console.log('saved', this.state.m.format('llll'));
	};*/
	render() {
		return (
			<div className="Deadline">
				Deadline: <input id="PopoverDate" className="btn btn-md btn-primary" onClick={this.toggle} type="text" value={this.state.moment.format('DD/MM/YYYY HH:mm')} readOnly />
				<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverDate"} target="PopoverDate" toggle={this.toggle}>
					<PopoverHeader>Choose deadline</PopoverHeader>
					<PopoverBody>
						<InputMoment
							moment={this.state.moment}
							onChange={this.handleChange.bind(this)}
							minStep={5}
						//onSave={this.handleSave}
						/>
					</PopoverBody>
				</Popover>

			</div>
		)
	}
}

export default Deadline;