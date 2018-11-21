import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListWrapper from './ListWrapper';
import UtilityFunctions from './UtilityFunctions';
import axiosInstance from './axiosInstance';
import Addlist from './Addlist';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from './history';
import { withAlert } from 'react-alert';

const getListStyle = () => ({
	display: 'flex',
	height: '95%',
	overflow: "auto",
});

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	minWidth: '250px',
	...draggableStyle,
});

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: null, lists: [], isDragging: false, cookies: this.props.cookies, modalIsOpen: false
		};
		this.onCardDrop.bind(this);
		this.onListDrop.bind(this);
		this.setBoards.bind(this);
		this.changeModalState.bind(this);
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	getBoards(force) {
		axiosInstance.get('/boards/' + this.props.match.params.id)
			.then(res => {
				if (force === undefined || force !== true) {
					if (res.request.fromCache === true) {
						return;
					}
				}
				if (this.state.isDragging) {
					return
				}
				if (res.data !== null && res.data !== undefined) {
					this.setState({ board: res.data });
					this.state.cookies.set(this.props.match.params.id, res.data, { maxAge: 3600 * 24, path: '/' });
					if (res.data.cardLists !== null && res.data.cardLists !== undefined) {
						this.setState({ lists: res.data.cardLists });
					}
				}
			}).catch(() => {
				history.push('/');
			});
	}
	setBoards() {
		if (this.state.board !== null && this.state.board !== undefined) {
			axiosInstance.patch('/boards/' + this.props.match.params.id, { cardLists: this.state.lists }).then(res => {
				this.setState({
					isDragging: false
				});
				if (res.status !== 200) {
					console.log(res);
					this.props.alert.error('Something went wrong with updating drag and drop result to server');
				}
			}).catch((err) => {
				this.setState({
					isDragging: false
				});
				console.log(err);
				this.props.alert.error('Something went wrong with updating drag and drop result to server');
			});
		}
	}
	componentDidMount() {
		if (this.state.cookies.get(this.props.match.params.id) !== undefined) {
			this.setState({ board: this.state.cookies.get(this.props.match.params.id), lists: this.state.cookies.get(this.props.match.params.id).cardLists });
		}
		if (this.state.cookies.get("username") !== undefined && this.state.cookies.get("token") !== undefined && this.state.cookies.get("refresh_token") !== undefined) {
			axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.cookies.get("token");
		}
		this.getBoards(true);
		this.interval = setInterval(() => { this.getBoards() }, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	onCardDrop(result) {
		var listsCopy;
		if (result.destination.droppableId === result.source.droppableId) {
			if (result.source.index === result.destination.index) {
				return;
			}
			const i = UtilityFunctions.getIndex(result.source.droppableId, this.state.lists);
			listsCopy = this.state.lists;
			const reorderedCards = UtilityFunctions.reorder(
				listsCopy[i].cards,
				result.source.index,
				result.destination.index
			);
			listsCopy[i].cards = reorderedCards;
			this.setState({
				lists: listsCopy, isDragging: true
			}, () => this.setBoards());

		} else {
			const i = UtilityFunctions.getIndex(result.source.droppableId, this.state.lists);
			const j = UtilityFunctions.getIndex(result.destination.droppableId, this.state.lists);
			listsCopy = this.state.lists;
			const moveResult = UtilityFunctions.move(
				listsCopy[i].cards,
				listsCopy[j].cards,
				result.source,
				result.destination
			);
			listsCopy[i].cards = moveResult[0];
			listsCopy[j].cards = moveResult[1];
			this.setState({
				lists: listsCopy, isDragging: true
			}, () => this.setBoards());
		}
	}
	onListDrop(result) {
		var reorderedLists = UtilityFunctions.reorder(
			this.state.lists,
			result.source.index,
			result.destination.index
		);
		this.setState({
			lists: reorderedLists, isDragging: true
		}, () => this.setBoards());
	}

	onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		if (result.type === "cards") {
			this.onCardDrop(result);
		}
		if (result.type === "lists") {
			this.onListDrop(result);
		}
	}
	changeModalState(isOpen) {
		this.setState({ modalIsOpen: isOpen });
	}
	render() {
		var lists;
		if (this.state.lists !== null && this.state.lists !== undefined) {
			lists = (
				this.state.lists.map((list, index) => (
					<Draggable key={list.id} draggableId={list.id} index={index} isDragDisabled={this.state.modalIsOpen}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								style={getItemStyle(
									snapshot.isDragging,
									provided.draggableProps.style
								)}
							>
								<ListWrapper changeModalState={this.changeModalState.bind(this)} list={list} key={index} getBoards={this.getBoards.bind(this)}></ListWrapper>
							</div>
						)}
					</Draggable>
				)));
		}
		return (
			<DragDropContext onDragEnd={this.onDragEnd.bind(this)} >
				{this.state.board !== null ? <h3>{this.state.board.name}</h3> : ""}
				<ul>
					<Droppable droppableId="droppable" direction="horizontal" type="lists">
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								style={getListStyle()}
								{...provided.droppableProps}
							>
								{lists}
								<Addlist boardId={this.props.match.params.id} getBoards={this.getBoards.bind(this)} listsSize={this.state.lists === null || this.state.lists === undefined ? 0 : this.state.lists.length}></Addlist>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</ul>
			</DragDropContext>
		)
	}
}


export default withAlert(withCookies(Board));