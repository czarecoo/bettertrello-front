import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListWrapper from './ListWrapper';
import UtilityFunctions from './UtilityFunctions';
import axiosInstance from './axiosInstance';
import Addlist from './Addlist';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from './history';
import { withAlert } from 'react-alert';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import BoardSideMenu from './BoardSideMenu';
import BoardNameEdit from './BoardNameEdit';

const getListStyle = () => ({
	display: 'flex',
	height: '95%',
	overflow: "auto",
});

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	minWidth: '250px',
	...draggableStyle,
});

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: null, lists: [], isDragging: false, cookies: this.props.cookies, modalIsOpen: false, isMenuOpened: false, username: this.props.cookies.get("username"),
		};
		this.onCardDrop.bind(this);
		this.onListDrop.bind(this);
		this.setBoards.bind(this);
		this.changeModalState.bind(this);
	}
	handleClick() {
		this.setState({ isMenuOpened: !this.state.isMenuOpened });
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	getBoards(force) {
		axiosInstance.get('/boards/' + this.props.match.params.id)
			.then(res => {
				if (force === undefined || force !== true) {
					if (res.request.fromCache === true) {
						return;
					}
				}
				if (this.state.isDragging) {
					return
				}
				if (res.data !== null && res.data !== undefined) {
					this.setState({ board: res.data }, console.log(this.state.board));
					if (res.data.cardLists !== null && res.data.cardLists !== undefined) {
						this.setState({ lists: res.data.cardLists });
					}
				}
			}).catch(() => {
				history.push('/');
			});
	}
	setBoards() {
		axiosInstance.patch('/boards/' + this.props.match.params.id, { cardLists: this.state.lists }).then(res => {
			if (res.status === 200) {
				this.setState({
					isDragging: false
				});
			}
		});
	}
	componentDidMount() {
		if (this.state.cookies.get(this.props.match.params.id) !== undefined) {
			this.setState({ board: this.state.cookies.get(this.props.match.params.id), lists: this.state.cookies.get(this.props.match.params.id).cardLists });
		}
		if (this.state.cookies.get("username") !== undefined && this.state.cookies.get("token") !== undefined && this.state.cookies.get("refresh_token") !== undefined) {
			axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.cookies.get("token");
		}
		this.getBoards(true);
		this.interval = setInterval(() => { this.getBoards() }, 2000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	onCardDrop(result) {
		var listsCopy;
		if (result.destination.droppableId === result.source.droppableId) {
			if (result.source.index === result.destination.index) {
				return;
			}
			const i = UtilityFunctions.getIndex(result.source.droppableId, this.state.lists);
			listsCopy = this.state.lists;
			const reorderedCards = UtilityFunctions.reorder(
				listsCopy[i].cards,
				result.source.index,
				result.destination.index
			);
			listsCopy[i].cards = reorderedCards;
			this.setState({
				lists: listsCopy, isDragging: true
			}, () => this.setBoards());

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
				lists: listsCopy, isDragging: true
			}, () => this.setBoards());
		}
	}
	onListDrop(result) {
		var reorderedLists = UtilityFunctions.reorder(
			this.state.lists,
			result.source.index,
			result.destination.index
		);
		this.setState({
			lists: reorderedLists, isDragging: true
		}, () => this.setBoards());
	}

	onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		if (result.type === "cards") {
			this.onCardDrop(result);
		}
		if (result.type === "lists") {
			this.onListDrop(result);
		}
	}
	changeModalState(isOpen) {
		this.setState({ modalIsOpen: isOpen });
	}
	render() {
		var lists;
		if (this.state.lists !== null && this.state.lists !== undefined) {
			lists = (
				this.state.lists.map((list, index) => (
					<Draggable key={list.id} draggableId={list.id} index={index} isDragDisabled={this.state.modalIsOpen}>
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
								<ListWrapper lists={this.state.lists} username={this.state.username} changeModalState={this.changeModalState.bind(this)} list={list} key={index} getBoards={this.getBoards.bind(this)}></ListWrapper>
							</div>
						)}
					</Draggable>
				)));
		}
		return (
			<div>
				<DragDropContext onDragEnd={this.onDragEnd.bind(this)} >
					{this.state.board !== null && this.state.board !== undefined ? <h1><BoardNameEdit board={this.state.board} name={this.state.board.name} /></h1> : ""}
					<ul>
						<Droppable droppableId="droppable" direction="horizontal" type="lists">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									style={getListStyle()}
									{...provided.droppableProps}
								>
									{lists}
									<Addlist boardId={this.props.match.params.id} getBoards={this.getBoards.bind(this)} listsSize={this.state.lists === null || this.state.lists === undefined ? 0 : this.state.lists.length}></Addlist>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</ul>
				</DragDropContext>
				<OffCanvas width={300} transitionDuration={300} isMenuOpened={this.state.isMenuOpened} position={"right"}>
					<OffCanvasBody style={{ float: "right", position: "fixed", right: "0px", top: "42%", fontSize: '50px' }}>
						<div style={{ cursor: "pointer" }} onClick={this.handleClick.bind(this)}>{!this.state.isMenuOpened ? "<" : ">"}</div>
					</OffCanvasBody>
					<OffCanvasMenu className="sidebarInside" style={{ top: "47px" }}>
						<BoardSideMenu username={this.state.username} board={this.state.board} isOpen={this.state.isMenuOpened} close={this.handleClick.bind(this)} />
					</OffCanvasMenu>
				</OffCanvas>
			</div >
		)
	}
}


export default withAlert(withCookies(Board));