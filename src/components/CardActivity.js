import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import ActivityCommentEdit from './ActivityCommentEdit';
import { withAlert } from 'react-alert';

function canEdit(activity, username) {
	if (activity.ownerUsername !== null && activity.ownerUsername !== undefined && username !== null && username !== undefined) {
		// eslint-disable-next-line
		if (activity.ownerUsername == username && activity.isEditable) {
			return true;
		}
	};
	return false;
}

class CardActivity extends Component {
	delete() {
		axiosInstance.delete('/activities/' + this.props.activity.id)
			.then(res => {
				if (res.status !== 200 && res.status !== 201) {
					this.props.alert.error('Delete failed');
					console.log(res, this.props.activity);
				}
			}).catch((err) => {
				console.log(err);
				this.props.alert.error('Delete failed');
			});
	}
	render() {
		console.log(this.props.activity)
		return (
			<div className="activity">
				<div className="activityBtnsCont"><b>{this.props.activity.ownerUsername}</b>
					{canEdit(this.props.activity, this.props.username) ?
						<div className="activityBtns">
							<button onClick={this.delete.bind(this)} className="btn btn-md btn-secondary">Delete</button>
						</div>
						:
						null
					}</div>
				<div><i>{this.props.activity.date}</i>
					{this.props.activity.isEdited !== undefined && this.props.activity.isEdited ? " (isEdited)" : null}
				</div>
				<ActivityCommentEdit isisEditable={canEdit(this.props.activity, this.props.username)} card={this.props.card} activity={this.props.activity} comment={this.props.activity.data} />
				<hr></hr>
			</div >
		)
	}
}

export default withAlert(CardActivity);