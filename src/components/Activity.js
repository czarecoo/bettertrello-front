import React, { Component } from 'react';

class Activity extends Component {
	render() {
		return (
			<div className="activity">
				{this.props.activity.ownerUsername} {this.props.activity.date} {this.props.activity.data}<br></br>
			</div>
		)
	}
}

export default Activity;