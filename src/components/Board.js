import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: 8,
	width: 250,
});

const getIndex = (index, lists) => {
	for (var i = 0; i < lists.length; i++) {
		if (index === lists[i].id) {
			return i;
		}
	}
}

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = [];
	result[0] = sourceClone;
	result[1] = destClone;

	return result;
};
class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists:
				[
					{
						id: "list-1",
						cards: [
							{
								id: "card-1",
								content: "card 1"
							},
							{
								id: "card-2",
								content: "card 2"
							}
						]
					},
					{
						id: "list-2",
						cards: [
							{
								id: "card-3",
								content: "card 3"
							}
						]
					},
					{
						id: "list-3",
						cards: [
							{
								id: "card-4",
								content: "card 4"
							},
							{
								id: "card-5",
								content: "card 5"
							},
							{
								id: "card-6",
								content: "card 6"
							},
							{
								id: "card-7",
								content: "card 7"
							}
						]
					},
					{
						id: "list-4",
						cards: []
					}
				]
		};
	}

	onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		var listsCopy;
		if (result.destination.droppableId === result.source.droppableId) {

			const i = getIndex(result.source.droppableId, this.state.lists);
			listsCopy = this.state.lists;
			const reorderedCards = reorder(
				listsCopy[i].cards,
				result.source.index,
				result.destination.index
			);
			listsCopy[i].cards = reorderedCards;
			this.setState({
				lists: listsCopy,
			});
		} else {
			const i = getIndex(result.source.droppableId, this.state.lists);
			const j = getIndex(result.destination.droppableId, this.state.lists);
			listsCopy = this.state.lists;

			const moveResult = move(
				listsCopy[i].cards,
				listsCopy[j].cards,
				result.source,
				result.destination
			);
			listsCopy[i].cards = moveResult[0];
			listsCopy[j].cards = moveResult[1];
			this.setState({
				lists: listsCopy,
			});
		}
	}

	render() {
		var lists = (
			this.state.lists.map((list, index) => (
				<li key={index}>
					<Droppable droppableId={list.id}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
							>
								<h3>{list.id}</h3>
								<List cards={list.cards}></List>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</li>
			)));
		return (
			<ul>
				< DragDropContext onDragEnd={this.onDragEnd.bind(this)} >
					{lists}
				</DragDropContext >
			</ul>
		)
	}
}


export default Board;