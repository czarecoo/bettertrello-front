import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import Activity from "./Activity";
import BoardDeleteButton from "./BoardDeleteButton";


class BoardSideMenu extends Component {
	handleClickOutside = () => {
		if (this.props.isOpen) {
			this.props.close();
		}
	}
	render() {
		return (
			<div className="boardActivity">
				<h2>Menu</h2><hr></hr>
				{this.props.board !== null && this.props.board !== undefined ?
					<BoardDeleteButton board={this.props.board} />
					:
					null
				}
				<hr></hr>
				<h2>Board Activity</h2>
				{this.props.board !== null && this.props.board.activities !== undefined && this.props.board.activities !== null ? this.props.board.activities.map((activity, index) =>
					<Activity key={index} activity={activity} />
				) : "No activity"}
			</div>
		)
	}
}


export default onClickOutside(BoardSideMenu);