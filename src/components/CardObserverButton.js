import React, { Component } from 'react';
import axiosInstance from './axiosInstance';

class CardObserverButton extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			isObserving: false
		});
		console.log(this.props.card.observerUserNames, this.props.username)
	}
	componentDidMount() {
		this.interval = setInterval(() => { this.checkObserving() }, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	checkObserving() {
		if (this.props.card !== undefined && this.props.card.observerUserNames !== undefined &&
			this.props.card.observerUserNames !== null && this.props.card.observerUserNames.length > 0) {
			this.props.card.observerUserNames.forEach((username) => {
				// eslint-disable-next-line
				if (username == this.props.username) {
					this.setState({ isObserving: true });
				}
			})
		} else {
			this.setState({ isObserving: false });
		}
	}
	observe() {
		axiosInstance.post('/cards/' + this.props.card.id + '/observe')
			.then((result) => {
				console.log(result);
				if (result.status !== 200 && result.status !== 201) {
					console.log(result);
				}
			}).catch((err) => {
				console.log(err);
			});
	}
	stopObserving() {
		axiosInstance.post('/cards/' + this.props.card.id + '/unobserve')
			.then((result) => {
				console.log(result);
				if (result.status !== 200 && result.status !== 201) {
					console.log(result);
				}
			}).catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="Observer">
				{this.state.isObserving ?
					<button className="Observerbtn btn btn-md btn-primary" onClick={this.stopObserving.bind(this)}>Stop observing</button>
					:
					<button className="Observerbtn btn btn-md btn-primary" onClick={this.observe.bind(this)}>Observe</button>
				}
			</div>
		)
	}
}

export default CardObserverButton;