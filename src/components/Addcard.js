import React, { Component } from 'react';

class Addcard extends Component {
	render() {
		return (
			<span className="addCard">{this.props.listSize > 0 ? "+ Add another card" : "+ Add card"}</span>
		)
	}
}

export default Addcard;