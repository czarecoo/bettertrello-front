import React, { Component } from 'react';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div className="cardContent">
				<button className="xbtn btn rightCorner" onClick={() => this.props.close()}>X</button>
				<h2>{this.props.card.name}</h2>
				on list {this.props.listName}<br></br>
				Members:
				<h2>Description</h2>
				<h2>Comments</h2>
				<h2>Activity</h2>
			</div>
		)
	}
}


export default Card;