import React, { Component } from 'react';
import axiosInstance from './axiosInstance';

class Addlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddingList: false, newListName: ""
		};
	}
	addList() {
		if (this.state.newListName !== "") {
			axiosInstance.post('/boards/' + this.props.boardId + '/lists', {
				name: this.state.newListName,
				cards: [],
			}).then(res => {
				if (res.status === 200 || res.status === 201) {
					this.props.getBoards();
					this.toggleAddingList();
					this.setState({ newListName: "" });
				} else {
					console.log(res);
				}
			}).catch((err) => console.log(err));
		}

	}
	toggleAddingList() {
		this.setState({ isAddingList: !this.state.isAddingList });
	}
	onChange(event) {
		this.setState({ newListName: event.target.value });
	}
	render() {
		if (this.state.isAddingList) {
			return (
				<div className="addList addListBig">
					<input autoFocus placeholder="Enter list name..." onKeyPress={(e) => { if (e.key === 'Enter') this.addList() }} onChange={this.onChange.bind(this)} value={this.state.newListName}></input>
					<br></br><button className="btn addCardBtn" onClick={this.addList.bind(this)}>Add list</button>
					<label tabIndex="0" onKeyPress={(e) => { if (e.key === 'Enter') this.toggleAddingList() }} className="xbtn btn" onClick={this.toggleAddingList.bind(this)}>X</label>
				</div>
			)
		} else {
			return (
				<span tabIndex="0" onKeyPress={(e) => { if (e.key === 'Enter') this.toggleAddingList() }} onClick={this.toggleAddingList.bind(this)} className="addList">{this.props.listsSize > 0 ? "+ Add another list" : "+ Add first list"}</span>
			)
		}
	}
}

export default Addlist;