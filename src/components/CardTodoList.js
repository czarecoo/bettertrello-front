import React from 'react';
import ok from '../img/ok.png';
import remove from '../img/remove.png';
import axiosInstance from './axiosInstance';

class TodoList extends React.Component {
	render() {
		var items = this.props.items.map((item, id) => {
			if (item !== null) {
				return (
					<TodoListItem key={id} item={item} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
				);
			} else {
				return null;
			}
		});
		return (
			<ul className="list-group"> {items} </ul>
		);
	}
}

class TodoListItem extends React.Component {
	onClickClose() {
		this.props.removeItem(this.props.item.id);
	}
	onClickDone() {
		this.props.markTodoDone(this.props.item.id, this.props.item.isDone);
	}
	render() {
		var todoClass = !this.props.item.isDone ? "done" : "undone";
		return (
			<li className="list-group-item ">
				<div className={todoClass}>
					<div onClick={this.onClickDone.bind(this)}>
						<img src={!this.props.item.isDone ? remove : ok} alt="icon" height="25" width="25" />
						{this.props.item.data}
					</div>
					<button type="button" className="rightCorner close" onClick={this.onClickClose.bind(this)}>X</button>
				</div>
			</li>
		);
	}
}

class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = { inputValue: "" };
	}
	onSubmit() {
		this.props.addItem(this.state.inputValue);
		this.setState({ inputValue: "" })
	}
	onChange(event) {
		this.setState({ inputValue: event.target.value })
	}
	render() {
		return (
			<div className="form-inline">
				<input type="text" onChange={this.onChange.bind(this)} value={this.state.inputValue} className="form-control" placeholder="Add task..." />
				<button type="submit" onClick={this.onSubmit.bind(this)} className="btn btn-md btn-primary">Add</button>
			</div>
		);
	}
}

class CardTodoList extends React.Component {
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.markTodoDone = this.markTodoDone.bind(this);
	}
	addItem(newItemValue) {
		if (newItemValue !== "") {
			axiosInstance.post('/cards/' + this.props.card.id + '/checklist', { "data": newItemValue, "isDone": false })
				.then(res => {
					if (res.status !== 200 || res.status !== 201) {
						console.log(res);
					}
				}).catch((err) => console.log(err));
		}
	}
	removeItem(itemId) {
		axiosInstance.delete('/checklistitems/' + itemId)
			.then((result) => {
				if (result.status !== 200 && result.status !== 201) {
					console.log(result);
				}
			}).catch((err) => {
				console.log(err);
			});
	}
	markTodoDone(itemId, oldIsDone) {
		axiosInstance.patch('/checklistitems/' + itemId, { "isDone": !oldIsDone })
			.then((result) => {
				if (result.status !== 200 && result.status !== 201) {
					console.log(result);
				}
			}).catch((err) => {
				console.log(err);
			});
	}
	render() {
		return (
			<div id="cardTodoList">
				<h3>Task list</h3>
				{this.props.card.checkListItems !== undefined && this.props.card.checkListItems !== null && this.props.card.checkListItems.length > 0 ?
					<TodoList items={this.props.card.checkListItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
					:
					null
				}
				<TodoForm addItem={this.addItem} />
			</div>
		);
	}
}

export default CardTodoList;