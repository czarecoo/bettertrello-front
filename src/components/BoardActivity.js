import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

class BoardActivity extends Component {
	handleClickOutside = () => {
		if (this.props.isOpen) {
			this.props.close();
		}
	}
	render() {
		return (
			<div className="boardActivity">
				<h2>Board Activity</h2>
				{this.props.board !== null && this.props.board.activities !== undefined && this.props.board.activities !== null ? this.props.board.activities.map((activity, index) =>
					<div key={index}>
						{this.props.activity.username} {this.props.activity.date} {this.props.activity.data}<br></br>
					</div>
				) : "No activity"}
			</div>
		)
	}
}


export default onClickOutside(BoardActivity);