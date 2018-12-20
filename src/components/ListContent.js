import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import Card from './Card';
import moment from 'moment';
import checklist from '../img/checklist.png';
import clock from '../img/clock.png';

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
									<div><h5>{item.name}</h5></div>
									<div className="flexDivs">
										{item.checkListItems !== null && item.checkListItems !== undefined && item.checkListItems.length > 0 ?
											<div className="paddingRight5">
												<img src={checklist} alt="checklist" height="15" width="15"></img>
												{(item.checkListItems.filter((item) => { return item.done; }).reduce((all) => { return all + 1 }, 0))}/{item.checkListItems.length}
											</div>
											:
											null
										}
										{item.cardDeadlineDate !== null && item.cardDeadlineDate !== undefined && moment(item.cardDeadlineDate).isValid() ?
											<div>
												<img src={clock} alt="clock" height="15" width="15"></img>
												{moment(item.cardDeadlineDate).format("DD MMM")}
											</div>
											:
											null
										}
									</div>
									<Modal
										isOpen={this.state.openModalId === item.id}
										onRequestClose={this.closeModal}
										className="cardModal"
									>
										<Card username={this.props.username} card={item} listName={this.props.list.name} listId={this.props.listId} close={this.closeModal} />

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