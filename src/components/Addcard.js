import React, { Component } from 'react';
import axiosInstance from './axiosInstance';

class Addcard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddingCard: false, newCardName: ""
		};
	}
	addCard() {
		if (this.state.newCardName !== "") {
			this.toggleAddingCard();
			axiosInstance.post('/lists/' + this.props.listId + '/cards', { name: this.state.newCardName })
				.then(res => {
					if (res.status === 200 || res.status === 201) {
						this.props.getBoards();
						this.setState({ newCardName: "" });
					} else {
						console.log(res);
					}
				}).catch((err) => console.log(err));
		}
	}
	toggleAddingCard() {
		this.setState({ isAddingCard: !this.state.isAddingCard });
	}
	onChange(event) {
		this.setState({ newCardName: event.target.value });
	}
	render() {
		if (this.state.isAddingCard) {
			return (
				<div className="addCard">
					<textarea autoFocus height="30px" onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); this.addCard(); } }} className="addCardTxtArea" placeholder="Enter title for this card..." onChange={this.onChange.bind(this)} value={this.state.newCardName}></textarea>
					<br></br><button className="btn addCardBtn" onClick={this.addCard.bind(this)}>Add card</button>
					<label tabIndex="0" onKeyPress={(e) => { if (e.key === 'Enter') this.toggleAddingCard() }} className="xbtn btn" onClick={this.toggleAddingCard.bind(this)}>X</label>
				</div>
			)
		} else {
			return (
				<span tabIndex="0" onKeyPress={(e) => { if (e.key === 'Enter') this.toggleAddingCard() }} onClick={this.toggleAddingCard.bind(this)} className="addCard">{this.props.listSize > 0 ? "+ Add another card" : "+ Add card"}</span>
			)
		}
	}
}

export default Addcard;