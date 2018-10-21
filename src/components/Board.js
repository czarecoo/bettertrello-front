import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListWrapper from './ListWrapper';
import UtilityFunctions from './UtilityFunctions';
import axios from 'axios';
import { setup } from 'axios-cache-adapter'
import Addlist from './Addlist';

const api = setup({
	cache: {
		maxAge: 24 * 60 * 1000
	}
})

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
			board: null, lists: []
		};
		this.onCardDrop.bind(this);
		this.onListDrop.bind(this);
	}
	getBoards(useCache) {
		if (useCache === false || useCache === null || useCache === undefined) {
			axios.get('http://localhost:8080/boards/' + this.props.match.params.id)
				.then(res => {
					if (res.data !== null && res.data !== undefined) {
						this.setState({ board: res.data });
						if (res.data.cardLists !== null && res.data.cardLists !== undefined) {
							this.setState({ lists: res.data.cardLists });
						}
					}

				});
		} else {
			api({
				url: 'http://localhost:8080/boards/' + this.props.match.params.id,
				method: 'get'
			})
				.then(res => {
					if (res.request.fromCache === true) {
						return;
					}
					if (res.data !== null && res.data !== undefined) {
						this.setState({ board: res.data });
						if (res.data.cardLists !== null && res.data.cardLists !== undefined) {
							this.setState({ lists: res.data.cardLists });
						}
					}

				});
		}
	}
	componentDidMount() {
		this.getBoards();
		this.interval = setInterval(() => { this.getBoards(true) }, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	onCardDrop(result) {
		var listsCopy;
		if (result.destination.droppableId === result.source.droppableId) {
			const i = UtilityFunctions.getIndex(result.source.droppableId, this.state.lists);
			listsCopy = this.state.lists;
			const reorderedCards = UtilityFunctions.reorder(
				listsCopy[i].cards,
				result.source.index,
				result.destination.index
			);
			listsCopy[i].cards = reorderedCards;
			this.setState({
				lists: listsCopy,
			});

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
				lists: listsCopy
			});
		}
		axios.put('http://localhost:8080/boards/', { id: this.state.board.id, name: this.state.board.name, cardLists: listsCopy }).then((res) => {
			this.getBoards();
		});

	}
	onListDrop(result) {
		const reorderedLists = UtilityFunctions.reorder(
			this.state.lists,
			result.source.index,
			result.destination.index
		);
		this.setState({ lists: reorderedLists });
		axios.put('http://localhost:8080/boards/', { id: this.state.board.id, name: this.state.board.name, cardLists: reorderedLists }).then((res) => {
			this.getBoards();
		});
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

	render() {
		var lists = (
			this.state.lists.map((list, index) => (
				<Draggable key={list.id} draggableId={list.id} index={index}>
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
							<ListWrapper list={list} key={index} getBoards={this.getBoards.bind(this)}></ListWrapper>
						</div>
					)}
				</Draggable>
			)));
		return (
			<ul>
				<DragDropContext onDragEnd={this.onDragEnd.bind(this)} >
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
				</DragDropContext>
			</ul>
		)
	}
}


export default Board;