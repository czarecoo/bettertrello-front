import React, { Component } from 'react';

class Activity extends Component {
	render() {
		return (
			<div className="activity">
				<div className="activityBtnsCont"><b>{this.props.activity.ownerUsername}</b>
					{this.props.editable || this.props.deletable ?
						<div className="activityBtns">
							{this.props.editable ? <button className="btn btn-md btn-secondary">Edit</button> : null}
							{this.props.deletable ? <button className="btn btn-md btn-secondary">Delete</button> : null}
						</div>
						:
						null
					}</div>
				<div><i>{this.props.activity.date}</i></div>
				<div>{this.props.activity.data}</div>
				<hr></hr>
			</div >
		)
	}
}

export default Activity;