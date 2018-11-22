import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';
import onClickOutside from "react-onclickoutside";

class CardDescriptionEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: this.props.description !== null ? this.props.description : "", isEditing: false
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
		if (this.state.isEditing === false) {
			this.setState({
				description: this.props.description
			});
		}
		this.setState(prevState => ({
			isEditing: !prevState.isEditing
		}));
	}
	changeName() {
		if (this.state.description !== this.props.description) {
			axiosInstance.patch('/cards/' + this.props.card.id, { "description": this.state.description })
				.then((result) => {
					if (result.status !== 200 && result.status !== 201) {
						this.props.alert.error('Changing description failed');
					} else {
						this.isEditing();
					}
				}).catch(() => {
					this.props.alert.error('Changing description failed');
				});
		} else {
			this.isEditing();
		}
	}
	render() {
		return (
			<div onClick={!this.state.isEditing ? this.isEditing.bind(this) : null}>
				{this.state.isEditing ?
					<div>
						<textarea placeholder="Enter description" autoFocus name="description" onChange={this.handleChange.bind(this)} value={this.state.description !== null ? this.state.description : ""} style={{ resize: "none", }}></textarea>
						{this.state.description !== this.props.description ? <button onClick={this.changeName.bind(this)}>Save description</button> : null}
					</div>
					: <div>{this.props.description !== "" && this.props.description !== null ? this.props.description : "Click to add description"}<br></br>
					</div>}
			</div>
		)
	}
}


export default withAlert(onClickOutside(CardDescriptionEdit));