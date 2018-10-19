import React, { Component } from 'react';
import axios from 'axios';

class Addcard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddingCard: false, newCardName: ""
		};
	}
	addCard() {
		axios.post('http://localhost:8080/cards', {
			name: this.state.newCardName
		})
			.then(res => {
				if (res.status === 200) {
					this.props.getBoards();
				}
			});
	}
	toggleAddingCard() {
		this.setState({ isAddingCard: !this.state.isAddingCard });
	}
	onChange(event) {
		this.setState({ newCardName: event.value });
	}
	render() {
		if (this.state.isAddingCard) {
			return (
				<div className="addCard">
					<textarea height="30px" className="addCardTxtArea" placeholder="Enter title for this card..." onChange={this.onChange.bind(this)} defaultValue={this.state.newCardName}></textarea>
					<br></br><button className="btn addCardBtn" onClick={this.addCard.bind(this)}>Add card</button>
					<label className="xbtn btn" onClick={this.toggleAddingCard.bind(this)}>X</label>
				</div>
			)
		} else {
			return (
				<span onClick={this.toggleAddingCard.bind(this)} className="addCard">{this.props.listSize > 0 ? "+ Add another card" : "+ Add card"}</span>
			)
		}
	}
}

export default Addcard;