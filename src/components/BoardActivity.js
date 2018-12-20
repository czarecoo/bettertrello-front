import React, { Component } from 'react';

class BoardActivity extends Component {
	render() {
		return (
			<div className="activity">
				<div className="activityBtnsCont"><b>{this.props.activity.ownerUsername}</b></div>
				<div><i>{this.props.activity.date}</i></div>
				<div>{this.props.activity.data}</div>
				<hr></hr>
			</div >
		)
	}
}

export default BoardActivity;