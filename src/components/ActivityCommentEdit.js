import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import onClickOutside from "react-onclickoutside";
import { withAlert } from 'react-alert';

class ActivityCommentEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: this.props.comment !== null ? this.props.comment : "", isEditing: false
		};
	}
	handleClickOutside = () => {
		if (this.state.isEditing === true) {
			this.isEditing();
		}
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	isEditing() {
		if (this.state.isEditing === true) {
			this.setState({
				comment: this.props.comment
			});
		}
		this.setState(prevState => ({
			isEditing: !prevState.isEditing
		}));
	}
	changeActivity() {
		if (this.state.comment !== this.props.comment && this.state.comment !== "") {
			axiosInstance.patch('/activities/' + this.props.activity.id, { "id": this.props.activity.id, "data": this.state.comment })
				.then((result) => {
					this.isEditing();
					if (result.status !== 200 && result.status !== 201) {
						this.props.alert.error('Edit failed');
						console.log(result, this.props.activity);
					}
				}).catch((err) => {
					console.log(err);
					this.props.alert.error('Edit failed');
				});
		} else {
			this.isEditing();
		}
	}
	render() {
		if (this.props.isisEditable) {
			return (
				<div onClick={!this.state.isEditing ? this.isEditing.bind(this) : null}>
					{this.state.isEditing ?
						<div>
							<textarea placeholder="Enter new activity content" autoFocus name="comment" onChange={this.handleChange.bind(this)} value={this.state.comment !== null ? this.state.comment : ""} style={{ resize: "none", }}></textarea>
							{this.state.comment !== this.props.comment ? <button className="btn btn-md btn-primary" onClick={this.changeActivity.bind(this)}>Save activity</button> : null}
						</div>
						: <div>{this.props.comment}<br></br>
						</div>}
				</div>
			)
		} else {
			return (
				<div>{this.props.comment}<br></br>
				</div>
			)
		}
	}
}


export default withAlert(onClickOutside(ActivityCommentEdit));