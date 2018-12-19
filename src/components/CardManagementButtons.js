import React, { Component } from 'react';
import CardDeadline from './CardDeadline';
import CardCopyButton from './CardCopyButton';
import CardDeleteButton from './CardDeleteButton';

class CardManagementButtons extends Component {
	constructor(props) {
		super(props);
		this.state = ({ isObserving: false });
	}
	/* TODO observer method
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
	observe() {
		this.setState({ isObserving: true });
	}
	stopObserving() {
		this.setState({ isObserving: false });
	}

	render() {
		return (
			<div className="Observer">
				<CardDeadline card={this.props.card} />
				{this.state.isObserving ?
					<button className="Observerbtn btn btn-md btn-primary" onClick={this.stopObserving.bind(this)}>Stop observing</button>
					:
					<button className="Observerbtn btn btn-md btn-primary" onClick={this.observe.bind(this)}>Observe</button>
				}
				<CardCopyButton card={this.props.card} />
				<CardDeleteButton close={this.props.close} card={this.props.card} />
			</div>
		)
	}
}

export default CardManagementButtons;