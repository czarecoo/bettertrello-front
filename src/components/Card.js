import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';
import CardNameEdit from './CardNameEdit';

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
		if (this.state.comment !== '' && this.props.card.comments !== undefined) {
			axiosInstance.patch('/cards/' + this.props.card.id, { "comments": this.props.card.comments.push(this.state.comment) })
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
				on list {this.props.listName}<br></br>
				<h2>Members:</h2>
				{this.props.card.members !== undefined ? this.props.card.members.map((member, index) =>
					<li key={index} className="members">
						{member}
					</li>
				) : "No members"}
				<h2>Description</h2>
				{this.props.card.description !== undefined ? this.props.card.description : "No description"}
				<h2>Comments</h2>
				<textarea type="text" className="comments" name="comment" placeholder="Enter comment." value={this.state.comment} onChange={this.handleChange.bind(this)} style={{ resize: "none", }} /><br></br>
				<button className="btn btn-md btn-primary" onClick={this.addComment.bind(this)}>Add comment</button>
				<h2>Activity</h2>
				<ul>
					{this.props.card.activity !== undefined ? this.props.card.activity.map((activity, index) =>
						<li key={index} className="activity">
							{activity}
						</li>
					) : "No activity"}
				</ul>
			</div>
		)
	}
}


export default withAlert(Card);