import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: 16,
	margin: `0 0 8 px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle
});

class Column extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.title} index={this.props.index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={getItemStyle(
							snapshot.isDragging,
							provided.draggableProps.style
						)}>
						<div className="card">
							<div className="header">
								Header
					</div>
							Contents
				</div>
					</div>
				)}

			</Draggable>
		);
	}
}


export default Column;