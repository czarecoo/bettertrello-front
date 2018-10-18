import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	padding: 16,
	margin: `0 0 8px 0`,
	background: isDragging ? 'lightgreen' : 'grey',
	...draggableStyle,
});

class ListContent extends Component {
	render() {
		if (this.props.cards === undefined) {
			return null;
		}
		return (
			this.props.cards.map((item, index) => (
				<Draggable key={item.id} draggableId={item.id} index={index}>
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
							{item.content}
						</div>
					)}
				</Draggable>
			))
		)
	}
}


export default ListContent;