import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import onClickOutside from "react-onclickoutside";

class ActivityCommentEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: this.props.comment !== null ? this.props.comment : "",
		};
	}
	handleClickOutside = () => {
		if (this.props.isEditing === true) {
			this.isEditing();
		}
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	isEditing() {
		if (this.props.isEditing === false) {
			this.setState({
				comment: this.props.comment
			});
		}
	}
	changeName() {
		if (this.state.comment !== this.props.comment && this.state.comment !== "") {
			axiosInstance.patch('/activities/' + this.props.activity.id, { "id": this.props.activity.id })
				.then((result) => {
					if (result.status !== 200 && result.status !== 201) {
						console.log(result);
					}
				}).catch((err) => {
					console.log(err);
				});
		}
	}
	render() {
		return (
			<div>
				{this.props.isEditing ?
					<div>
						<textarea placeholder="Enter activity" autoFocus name="comment" onChange={this.handleChange.bind(this)} value={this.state.comment !== null ? this.state.comment : ""} style={{ resize: "none", }}></textarea>
						{this.state.comment !== this.props.comment ? <button className="btn btn-md btn-primary" onClick={this.changeName.bind(this)}>Save activity</button> : null}
					</div>
					: <div>{this.props.comment !== "" && this.props.comment !== null ? this.props.comment : "Click to add activity"}<br></br>
					</div>}
			</div>
		)
	}
}


export default onClickOutside(ActivityCommentEdit);