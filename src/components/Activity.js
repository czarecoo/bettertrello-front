import React, { Component } from 'react';

class Activity extends Component {
	render() {
		return (
			<div className="activity">
				<div><b>{this.props.activity.ownerUsername}</b></div>
				<div><i>{this.props.activity.date}</i></div>
				<div>{this.props.activity.data}</div>
			</div>
		)
	}
}

export default Activity;