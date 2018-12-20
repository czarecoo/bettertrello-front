import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import ActivityCommentEdit from './ActivityCommentEdit';

class CardActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
		};
	}
	delete() {
		axiosInstance.delete('/activities/' + this.props.activity.id)
			.then(res => {
				console.log(res, this.props.activity);
				if (res.status !== 200 && res.status !== 201) {
					console.log(res, this.props.activity);
				}
			}).catch((err) => console.log(err));
	}
	edit() {
		this.setState({ isEditing: !this.state.isEditing });
	}
	render() {
		return (
			<div className="activity">
				<div className="activityBtnsCont"><b>{this.props.activity.ownerUsername}</b>
					{this.props.editable ?
						<div className="activityBtns">
							<button onClick={this.edit.bind(this)} className="btn btn-md btn-secondary">Edit</button>
							<button onClick={this.delete.bind(this)} className="btn btn-md btn-secondary">Delete</button>
						</div>
						:
						null
					}</div>
				<div><i>{this.props.activity.date}</i>
					{this.props.activity.isEdited !== undefined && this.props.activity.isEdited ? "Edited" : null}
				</div>
				<ActivityCommentEdit isEditing={this.state.isEditing} card={this.props.card} activity={this.props.activity} comment={this.props.activity.data} />
				<hr></hr>
			</div >
		)
	}
}

export default CardActivity;