import React, { Component } from 'react';
import axios from 'axios';

class Addlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddingList: false, newListName: ""
		};
	}
	addList() {
		if (this.state.newListName !== "") {
			axios.post('http://localhost:8080/boards/' + this.props.boardId + '/lists', {
				name: this.state.newListName,
				cards: [],
			})
				.then(res => {
					if (res.status === 200) {
						this.props.getBoards();
						this.toggleAddingCard();
					}
				});
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
					<input placeholder="Enter list name..." onChange={this.onChange.bind(this)} value={this.state.newListName}></input>
					<br></br><button className="btn addCardBtn" onClick={this.addList.bind(this)}>Add list</button>
					<label className="xbtn btn" onClick={this.toggleAddingList.bind(this)}>X</label>
				</div>
			)
		} else {
			return (
				<span onClick={this.toggleAddingList.bind(this)} className="addList">{this.props.listsSize > 0 ? "+ Add another list" : "+ Add list"}</span>
			)
		}
	}
}

export default Addlist;