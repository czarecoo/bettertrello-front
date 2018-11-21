import React, { Component } from 'react';

class Activity extends Component {
	render() {
		return (
			<li className="activity">
				{this.props.activity.username} {this.props.activity.date} {this.props.activity.data}
			</li>

		)
	}
}

export default Activity;