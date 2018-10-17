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
							},
							{
								id: "card-4",
								content: "card 4"
							}
						]
					}
				]
		};
	}

	onDragEnd(result) {
		if (!result.destination) {
			return;
		}

		if (result.destination.droppableId === result.source.droppableId) {

			const i = getIndex(result.source.droppableId, this.state.lists);
			var listsCopy = this.state.lists;
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
			console.log(result);
		}
	}

	render() {
		return (
			this.state.lists.map((list, index) => (
				< DragDropContext onDragEnd={this.onDragEnd.bind(this)} key={index} >
					<Droppable droppableId={list.id}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
							>
								<List cards={list.cards}></List>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext >
			)
			)
		)
	}
}


export default Board;