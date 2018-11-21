import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import Card from './Card';
Modal.setAppElement('#root');
class ListContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		if (!this.state.modalIsOpen) {
			this.setState({ modalIsOpen: true });
			this.props.changeModalState(true);
		}
	}

	closeModal() {
		if (this.state.modalIsOpen) {
			this.setState({ modalIsOpen: false });
			this.props.changeModalState(false);
		}
	}
	render() {
		if (this.props.cards === undefined || this.props.cards === null) {
			return null;
		}
		return (
			this.props.cards.map((item, index) => (
				item !== undefined ?
					<div key={index}>
						<Draggable draggableId={item.id} index={index} isDragDisabled={this.state.modalIsOpen}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									className="card"
									onClick={this.openModal}
								>
									{item.name}
									<Modal
										isOpen={this.state.modalIsOpen}
										onRequestClose={this.closeModal}
										className="cardModal"
									>
										<Card card={item} listName={this.props.list.name} listId={this.props.listId} close={this.closeModal} />
									</Modal>
								</div>
							)}
						</Draggable>

					</div>
					: null
			))
		)
	}
}


export default ListContent;