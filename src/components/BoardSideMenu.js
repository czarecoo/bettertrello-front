import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import BoardActivity from "./BoardActivity";
import BoardDeleteButton from "./BoardDeleteButton";
import InviteToBoard from "./InviteToBoard";

class BoardSideMenu extends Component {
	handleClickOutside = () => {
		if (this.props.isOpen) {
			this.props.close();
		}
	}
	showMenu() {
		if (this.props.board !== null && this.props.board !== undefined &&
			this.props.board.userPermissionsMap !== undefined && this.props.board.userPermissionsMap !== null &&
			this.props.username !== null && this.props.username !== undefined) {
			for (var key in this.props.board.userPermissionsMap) {
				// eslint-disable-next-line
				if (key == this.props.username && this.props.board.userPermissionsMap[key] === "OWNER") {
					return true;
				}
			}
		}
		return false;
	}
	render() {
		return (
			<div className="boardActivity">
				{this.showMenu() ? <div>
					<h2>Menu</h2><hr></hr>
					<BoardDeleteButton board={this.props.board} />
					<InviteToBoard board={this.props.board} />
				</div>
					: "Menu unavalible for non owner users."}
				<hr></hr>
				<h2>Board Activity</h2>
				{this.props.board !== null && this.props.board.activities !== undefined && this.props.board.activities !== null ? this.props.board.activities.map((activity, index) =>
					<BoardActivity key={index} activity={activity} />
				) : "No activity"}
			</div>
		)
	}
}


export default onClickOutside(BoardSideMenu);