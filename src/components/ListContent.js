import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

class ListContent extends Component {
	render() {
		if (this.props.cards === undefined || this.props.cards === null) {
			return null;
		}
		return (
			this.props.cards.map((item, index) => (
				item !== undefined ?
					<Draggable key={item.id} draggableId={item.id} index={index}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								className="card"
							>
								{item.name}
							</div>
						)}
					</Draggable>
					: null

			))
		)
	}
}


export default ListContent;