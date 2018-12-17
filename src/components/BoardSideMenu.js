import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import Activity from "./Activity";


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
				<button className="btn btn-md btn-primary">Close board</button>
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