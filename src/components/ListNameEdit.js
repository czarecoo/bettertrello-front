import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';
import onClickOutside from "react-onclickoutside";

class ListNameEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name, isEditing: false
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
				name: this.props.name
			});
		}
		this.setState(prevState => ({
			isEditing: !prevState.isEditing
		}));
	}
	changeName() {
		if (this.state.name !== this.props.name) {
			if (this.state.name !== '') {
				axiosInstance.patch('/lists/' + this.props.list.id, { "name": this.state.name })
					.then((result) => {
						if (result.status !== 200 && result.status !== 201) {
							this.props.alert.error('Changing list name failed');
						} else {
							this.isEditing();
						}
					}).catch(() => {
						this.props.alert.error('Changing list name failed');
					});
			} else {
				this.props.alert.error("Cannot change list name to empty");
			}
		} else {
			this.isEditing();
		}
	}
	render() {
		return (
			<div onClick={!this.state.isEditing ? this.isEditing.bind(this) : null}>
				{this.state.isEditing ?
					<input autoFocus style={{ width: "234px" }} name="name" onKeyPress={(e) => { if (e.key === 'Enter') this.changeName() }} onChange={this.handleChange.bind(this)} value={this.state.name}></input>
					: this.props.name}
			</div>
		)
	}
}


export default withAlert(onClickOutside(ListNameEdit));