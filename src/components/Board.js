import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListWrapper from './ListWrapper';
import UtilityFunctions from './UtilityFunctions';

const getListStyle = () => ({
	display: 'flex',
	overflow: 'auto',
});

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	...draggableStyle,
});

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: UtilityFunctions.getTestData()
		};
		this.onCardDrop.bind(this);
		this.onListDrop.bind(this);
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
				lists: listsCopy,
			});
		}
	}
	onListDrop(result) {
		const reorderedLists = UtilityFunctions.reorder(
			this.state.lists,
			result.source.index,
			result.destination.index
		);
		this.setState({
			lists: reorderedLists,
		});
	}

	onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		console.log(result)
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
							<ListWrapper list={list} key={index}></ListWrapper>
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