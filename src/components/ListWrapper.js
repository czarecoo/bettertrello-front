import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ListContent from './ListContent';
import Addcard from './Addcard';
import ListNameEdit from './ListNameEdit';

const getListStyle = isDraggingOver => ({
	background: 'lightgrey',
	padding: 8,
	minHeight: 32,
});

class ListWrapper extends Component {
	render() {
		return (
			<li>
				{this.props.list !== null && this.props.list !== undefined ? <h3 className="listTitle"><ListNameEdit list={this.props.list} name={this.props.list.name} /></h3> : ""}
				<Droppable droppableId={this.props.list.id} type={"cards"}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>

							<ListContent changeModalState={this.props.changeModalState.bind(this)} list={this.props.list} listId={this.props.list.id} cards={this.props.list.cards}></ListContent>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<Addcard listId={this.props.list.id} getBoards={this.props.getBoards} listSize={this.props.list.cards === null || this.props.list.cards === undefined ? 0 : this.props.list.cards.length}></Addcard>
			</li>
		)
	}
}


export default ListWrapper;