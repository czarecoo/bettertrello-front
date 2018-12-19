import React from 'react';
import ok from '../img/ok.png';
import remove from '../img/remove.png';
import axiosInstance from './axiosInstance';

class TodoList extends React.Component {
	render() {
		var items = this.props.items.map((item, id) => {
			if (item !== null) {
				return (
					<TodoListItem key={id} item={item} id={item.id} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
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
	constructor(props) {
		super(props);
		this.onClickClose = this.onClickClose.bind(this);
		this.onClickDone = this.onClickDone.bind(this);
	}
	onClickClose() {
		this.props.removeItem(this.props.id);
	}
	onClickDone() {
		this.props.markTodoDone(this.props.id);
	}
	render() {
		var todoClass = !this.props.item.isDone ? "done" : "undone";
		return (
			<li className="list-group-item ">
				<div className={todoClass}>
					<div onClick={this.onClickDone}><img src={!this.props.item.isDone ? remove : ok} alt="icon" height="25" width="25" />
						{this.props.item.data}</div>
					<button type="button" className="rightCorner close" onClick={this.onClickClose}>&times;</button>
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
	onSubmit(event) {
		event.preventDefault();
		this.props.addItem(this.state.inputValue);
		this.setState({ inputValue: "" })
	}
	onChange(event) {
		this.setState({ inputValue: event.target.value })
	}
	render() {
		return (
			<form ref="form" onSubmit={this.onSubmit} className="form-inline">
				<input type="text" onChange={this.onChange.bind(this)} value={this.state.inputValue} className="form-control" placeholder="Add task..." />
				<button type="submit" className="btn btn-md btn-primary">Add</button>
			</form>
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
		console.log(itemId)
		axiosInstance.delete('/checklistitems/' + itemId)
			.then((result) => {
				if (result.status !== 200 && result.status !== 201) {
					console.log(result);
				}
			}).catch((err) => {
				console.log(err);
			});
	}
	markTodoDone(itemId) {
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
		//var todo = todoItems[itemId];
		//todo.isDone = !todo.isDone;
		//this.setState({ todoItems: todoItems });
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