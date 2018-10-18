import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ListWrapper from './ListWrapper';
import UtilityFunctions from './UtilityFunctions';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: UtilityFunctions.getTestData()
		};
		this.onCardDrop.bind(this);
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

	onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		console.log(result)
		this.onCardDrop(result);
	}

	render() {
		var lists = (
			this.state.lists.map((list, index) => (
				<ListWrapper list={list} key={index}></ListWrapper>
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