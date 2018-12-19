import React, { Component } from 'react';
import InputMoment from 'input-moment';
import '../../node_modules/input-moment/dist/input-moment.css';
import moment from 'moment';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';

class CardDeadline extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: "", datePickerData: moment(),
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

	handleChange(data) {
		this.setState({ datePickerData: data });
	};
	handleSave() {
		axiosInstance.patch('/cards/' + this.props.card.id, { "cardDeadlineDate": this.state.datePickerData._d.toISOString() })
			.then((result) => {
				if (result.status !== 200 && result.status !== 201) {
					this.props.alert.error('Patching deadline to server failed');
					console.log(result);
				}
			}).catch((err) => {
				this.props.alert.error('Patching deadline to server failed');
				console.log(err);
			});
		this.setState({ popoverOpen: "" });
	};
	render() {
		return (
			<div className="Deadline">
				<input id="PopoverDate" size="12" className="Observerbtn btn btn-md btn-primary" onClick={this.toggle} type="text" value={this.props.card !== undefined && this.props.card.cardDeadlineDate !== undefined && moment(this.props.card.cardDeadlineDate).isValid() ? moment(this.props.card.cardDeadlineDate).format("DD MMM YYYY HH:mm").toString() : "Set deadline"} readOnly />
				<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverDate"} target="PopoverDate" toggle={this.toggle}>
					<PopoverHeader>Choose deadline</PopoverHeader>
					<PopoverBody>
						<InputMoment
							moment={this.state.datePickerData}
							onChange={this.handleChange.bind(this)}
							minStep={15}
							onSave={this.handleSave.bind(this)}
							locale="en"
						/>
					</PopoverBody>
				</Popover>

			</div>
		)
	}
}

export default withAlert(CardDeadline);