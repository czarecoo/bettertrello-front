import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import Card from './Card';
Modal.setAppElement('#root');
class ListContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false, openModalId: null
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(id) {
		if (!this.state.modalIsOpen) {
			this.setState({ modalIsOpen: true, openModalId: id });
			this.props.changeModalState(true);
		}
	}

	closeModal() {
		if (this.state.modalIsOpen) {
			this.setState({ modalIsOpen: false, openModalId: null });
			this.props.changeModalState(false);
		}
	}
	render() {
		if (this.props.cards === undefined || this.props.cards === null) {
			return null;
		}
		return (
			this.props.cards.map((item, index) => (
				item !== undefined && (item.archived === undefined || (item.archived !== undefined && item.archived !== true)) ?
					<div key={index}>
						<Draggable draggableId={item.id} index={index} isDragDisabled={this.state.modalIsOpen}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									className="card"
									onClick={() => this.openModal(item.id)}
								>
									{item.name}
									{item.cardDeadlineDate !== undefined ?
										<div>
											{item.cardDeadlineDate}
										</div>
										:
										null}
									{item.checkListItems !== undefined && item.checkListItems > 0 ?
										<div>
											{item.checkListItems.lenght}
										</div>
										: null}
									<Modal
										isOpen={this.state.openModalId === item.id}
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