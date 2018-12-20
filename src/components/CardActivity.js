import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import ActivityCommentEdit from './ActivityCommentEdit';
import { withAlert } from 'react-alert';

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
		return (
			<div className="activity">
				<div className="activityBtnsCont"><b>{this.props.activity.ownerUsername}</b>
					{this.props.editable ?
						<div className="activityBtns">
							<button onClick={this.delete.bind(this)} className="btn btn-md btn-secondary">Delete</button>
						</div>
						:
						null
					}</div>
				<div><i>{this.props.activity.date}</i>
					{this.props.activity.isEdited !== undefined && this.props.activity.isEdited ? "Edited" : null}
				</div>
				<ActivityCommentEdit card={this.props.card} activity={this.props.activity} comment={this.props.activity.data} />
				<hr></hr>
			</div >
		)
	}
}

export default withAlert(CardActivity);