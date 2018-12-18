import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Select from 'react-select';

const optionsBoard = [
	{ value: 'board1', label: 'Board 1' },
	{ value: 'board2', label: 'Board 2' },
	{ value: 'board3', label: 'Board 3' }
];
const optionsList = [
	{ value: 'list1', label: 'List 1' },
	{ value: 'list2', label: 'List 2' },
	{ value: 'list3', label: 'List 3' }
];
const optionsPosition = [
	{ value: 'pos1', label: 'Position 1' },
	{ value: 'pos2', label: 'Position 2' },
	{ value: 'pos3', label: 'Position 3' }
];
class CardCopyButton extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: "", cardName: "", selectedBoard: null, selectedList: null, selectedPosition: null,
		};
	}
	toggle(event) {
		if (this.state.popoverOpen === event.target.id || this.state.popoverOpen !== "") {
			this.setState({ popoverOpen: "" });
		}
		else {
			this.setState({ popoverOpen: event.target.id });
		}
	}
	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	copy() {

	}
	handleBoardSelection = (selectedBoard) => {
		this.setState({ selectedBoard });
	}
	handleListSelection = (selectedList) => {
		this.setState({ selectedList });
	}
	handlePositionSelection = (selectedPosition) => {
		this.setState({ selectedPosition });
	}
	render() {
		return (
			<div className="copyCard">
				<button id="PopoverCopyCard" className="Observerbtn btn btn-md btn-primary" onClick={this.toggle} >Copy</button>
				<Popover placement="bottom" isOpen={this.state.popoverOpen === "PopoverCopyCard"} target="PopoverCopyCard" toggle={this.toggle.bind(this)}>
					<PopoverHeader>Card copy</PopoverHeader>
					<PopoverBody>
						<textarea type="text" className="comments" placeholder="Enter new card name." value={this.state.cardName} onChange={this.onChange.bind(this)} style={{ resize: "none", }} /><br></br>
						Copy to:
						<Select
							placeholder={"Choose board"}
							value={this.state.selectedBoard}
							onChange={this.handleBoardSelection}
							options={optionsBoard}
						/>
						<Select
							placeholder={"Choose list"}
							value={this.state.selectedList}
							onChange={this.handleListSelection}
							options={optionsList}
						/>
						<Select
							placeholder={"Choose card"}
							value={this.state.selectedPosition}
							onChange={this.handlePositionSelection}
							options={optionsPosition}
						/>
						<button className="btn btn-md btn-primary" onClick={this.copy.bind(this)}>Copy</button>
					</PopoverBody>
				</Popover>

			</div>
		)
	}
}

export default CardCopyButton;