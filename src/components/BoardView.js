import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count, offset = 0) =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k + offset}`,
		content: `item ${k + offset}`
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250
});

class BoardView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: [], items: getItems(10), selected: getItems(5, 10)
		};
	}

	componentDidMount() {
		axios.get('http://localhost:8080/boards/' + this.props.match.params.id + '/lists')
			.then(res => {
				this.setState({ lists: res.data });
			});
	}

	/**
		 * A semi-generic way to handle multiple lists. Matches
		 * the IDs of the droppable container to the names of the
		 * source arrays stored in the state.
		 */
	id2List = {
		droppable: 'items',
		droppable2: 'selected'
	};

	getList = id => this.state[this.id2List[id]];

	onDragEnd = result => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(
				this.getList(source.droppableId),
				source.index,
				destination.index
			);

			let state = { items };

			if (source.droppableId === 'droppable2') {
				state = { selected: items };
			}

			this.setState(state);
		} else {
			const result = move(
				this.getList(source.droppableId),
				this.getList(destination.droppableId),
				source,
				destination
			);

			this.setState({
				items: result.droppable,
				selected: result.droppable2
			});
		}
	};

	render() {
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">
							Board: {this.props.match.params.id}
						</h3>
					</div>
					<div>
						<h4><Link to="/">Go back to boards</Link></h4>
						<ul className="list">
							<DragDropContext onDragEnd={this.onDragEnd}>
								<li>
									List 1<br></br>
									<Droppable droppableId="droppable">
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												style={getListStyle(snapshot.isDraggingOver)}>
												{this.state.items.map((item, index) => (
													<Draggable
														key={item.id}
														draggableId={item.id}
														index={index}>
														{(provided, snapshot) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={getItemStyle(
																	snapshot.isDragging,
																	provided.draggableProps.style
																)}>
																{item.content}
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</li>
								<li>
									List 2<br></br>
									<Droppable droppableId="droppable2">
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												style={getListStyle(snapshot.isDraggingOver)}>
												{this.state.selected.map((item, index) => (
													<Draggable
														key={item.id}
														draggableId={item.id}
														index={index}>
														{(provided, snapshot) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={getItemStyle(
																	snapshot.isDragging,
																	provided.draggableProps.style
																)}>
																{item.content}
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</li>
							</DragDropContext>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default BoardView;