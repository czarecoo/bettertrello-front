import React, { Component } from 'react';
import CardDeadline from './CardDeadline';
import CardCopyButton from './CardCopyButton';
import CardDeleteButton from './CardDeleteButton';
import CardObserverButton from './CardObserverButton';

class CardManagementButtons extends Component {
	render() {
		return (
			<div className="Observer">
				<CardDeadline card={this.props.card} />
				<CardObserverButton username={this.props.username} card={this.props.card} />
				<CardCopyButton lists={this.props.lists} card={this.props.card} />
				<CardDeleteButton close={this.props.close} card={this.props.card} />
			</div>
		)
	}
}

export default CardManagementButtons;