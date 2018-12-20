import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Select from 'react-select';
import axiosInstance from './axiosInstance';

function toOptionsLists(arr) {
	var returnArr = [];
	for (var i = 0; i < arr.length; ++i) {
		var obj = {};
		obj['value'] = arr[i].id;
		obj['label'] = arr[i].name;
		obj['cards'] = arr[i].cards;
		returnArr.push(obj);
	}
	return returnArr;
}
function toOptionsCards(list) {
	var returnArr = [];
	if (list !== null && list !== undefined && list.cards !== null && list.cards !== undefined && list.cards.length > 0) {
		var arr = list.cards;
		for (var i = 0; i < arr.length; ++i) {
			var obj = {};
			obj['value'] = i;
			obj['label'] = "Position " + i;
			returnArr.push(obj);
		}
	}
	return returnArr;
}
class CardCopyButton extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			popoverOpen: "", cardName: "", selectedList: null, selectedPosition: null,
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
		if (this.state.cardName !== "" && this.state.selectedList !== null && this.state.selectedList !== undefined &&
			this.state.selectedPosition !== null && this.state.selectedPosition !== undefined) {
			axiosInstance.post('/cards/' + this.props.card.id + '/copy', { "listId": this.state.selectedList.value, "listPosition": this.state.selectedPosition.value })
				.then(res => {
					if (res.status !== 200 || res.status !== 201) {
						console.log(res);
					}
				}).catch((err) => console.log(err));

			this.setState({ popoverOpen: "" });
		}

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
						<textarea type="text" className="comments" name="cardName" placeholder="Enter new card name." value={this.state.cardName} onChange={this.onChange.bind(this)} style={{ resize: "none", }} /><br></br>
						Copy to:
						<Select
							placeholder={"Choose list"}
							value={this.state.selectedList}
							onChange={this.handleListSelection}
							options={toOptionsLists(this.props.lists)}
						/>
						<Select
							placeholder={"Choose card"}
							value={this.state.selectedPosition}
							onChange={this.handlePositionSelection}
							options={toOptionsCards(this.state.selectedList)}
						/>
						<button className="btn btn-md btn-primary" onClick={this.copy.bind(this)}>Copy</button>
					</PopoverBody>
				</Popover>

			</div>
		)
	}
}

export default CardCopyButton;