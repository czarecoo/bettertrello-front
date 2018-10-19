import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ListContent from './ListContent';

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: 8,
	width: 250,
});

class Board extends Component {
	render() {
		return (
			<li>
				<Droppable droppableId={this.props.list.id} type={"cards"}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							<h3>{this.props.list.name}</h3>
							<ListContent cards={this.props.list.cards}></ListContent>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</li>
		)
	}
}


export default Board;