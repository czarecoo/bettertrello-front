import React, { Component } from 'react';

class Addlist extends Component {
	render() {
		return (
			<span className="addList">{this.props.listsSize > 0 ? "+ Add another list" : "+ Add list"}</span>
		)
	}
}

export default Addlist;