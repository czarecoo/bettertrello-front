import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';
import CardNameEdit from './CardNameEdit';
import CardDescriptionEdit from './CardDescriptionEdit';
import Activity from './Activity';
import CardManagementButtons from './CardManagementButtons';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: ""
		};
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	addComment() {
		var array;
		if (this.props.card.activities !== undefined && this.props.card.activities !== null) {
			array = this.props.card.activities;
		} else {
			array = [];
		}

		if (this.state.comment !== '') {
			this.setState({ comment: "" });
			array.push({ data: this.state.comment });
			axiosInstance.patch('/cards/' + this.props.card.id, {
				"activities": array
			})
				.then((result) => {
					if (result.status !== 200 && result.status !== 201) {
						this.props.alert.error('Commenting failed');
					}
				}).catch(() => {
					this.props.alert.error('Commenting failed');
				});
		} else {
			this.props.alert.error("Cannot create empty comment");
		}
	}
	render() {
		return (
			<div className="cardContent">
				<button className="xbtn btn rightCorner" onClick={() => this.props.close()}>X</button>
				<h2><CardNameEdit card={this.props.card} name={this.props.card.name} /></h2>
				on list: <b>{this.props.listName}</b><br></br>

				<CardManagementButtons card={this.props.card} />
				<h2>Members:</h2>
				{this.props.card.members !== undefined ? this.props.card.members.map((member, index) =>
					<li key={index} className="members">
						{member}
					</li>
				) : "No members"}
				<h2>Description</h2>
				<CardDescriptionEdit card={this.props.card} description={this.props.card.description} />
				<h2>Comments</h2>
				<textarea type="text" className="comments" name="comment" placeholder="Enter comment." value={this.state.comment} onChange={this.handleChange.bind(this)} style={{ resize: "none", }} /><br></br>
				<button className="btn btn-md btn-primary" onClick={this.addComment.bind(this)}>Add comment</button>
				<h2>Activity</h2>
				<div className="cardActivity">
					{this.props.card.activities !== undefined && this.props.card.activities !== null ? this.props.card.activities.map((activity, index) =>
						<Activity key={index} activity={activity} />
					) : "No activity"}
				</div>
			</div>
		)
	}
}


export default withAlert(Card);