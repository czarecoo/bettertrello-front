import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';
import CardNameEdit from './CardNameEdit';
import CardDescriptionEdit from './CardDescriptionEdit';
import CardActivity from './CardActivity';
import CardManagementButtons from './CardManagementButtons';
import CardTodoList from './CardTodoList';

function isOwner(card, username) {
	if (card.ownerUsername !== null && card.ownerUsername !== undefined) {
		// eslint-disable-next-line
		if (card.ownerUsername == username) {
			return true;
		}

	};
	return false;
}

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
		if (this.state.comment !== '') {
			axiosInstance.post('/cards/' + this.props.card.id + '/activities', {
				"data": this.state.comment
			})
				.then((result) => {
					if (result.status !== 200 && result.status !== 201) {
						this.props.alert.error('Commenting failed');
					}
				}).catch(() => {
					this.props.alert.error('Commenting failed');
				});
			this.setState({ comment: "" });
		} else {
			this.props.alert.error("Cannot create empty comment");
		}
	}
	render() {
		return (
			<div className="cardContent">
				<button className="xbtn btn rightCorner" onClick={() => this.props.close()}>X</button>
				<h1><CardNameEdit card={this.props.card} name={this.props.card.name} /></h1>
				on list: <b>{this.props.listName}</b><br></br>

				<CardManagementButtons lists={this.props.lists} username={this.props.username} close={this.props.close} card={this.props.card} />
				<h3>Members:</h3>
				<ul>
					{this.props.card.observerUserNames !== undefined ? this.props.card.observerUserNames.map((member, index) =>
						<li key={index} className="members list btn-primary btn-sm marginRight5">
							{member}
						</li>
					) : "No members"}
				</ul>
				<h3>Description</h3>
				<CardDescriptionEdit card={this.props.card} description={this.props.card.description} />
				<CardTodoList card={this.props.card} />
				<h3>Comments</h3>
				<textarea type="text" className="comments" name="comment" placeholder="Enter comment." value={this.state.comment} onChange={this.handleChange.bind(this)} style={{ resize: "none", }} /><br></br>
				<button className="btn btn-md btn-primary" onClick={this.addComment.bind(this)}>Add comment</button>
				<h3>Activity</h3>
				<div className="cardActivity">
					{this.props.card.activities !== undefined && this.props.card.activities !== null ? this.props.card.activities.map((activity, index) =>
						<CardActivity key={index} activity={activity} editable={isOwner(this.props.card, this.props.username)} />
					) : "No activity"}
				</div>
			</div>
		)
	}
}


export default withAlert(Card);