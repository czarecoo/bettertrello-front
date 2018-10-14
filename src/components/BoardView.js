import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BoardView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:8080/boards/' + this.props.match.params.id + '/lists')
			.then(res => {
				this.setState({ lists: res.data });
			});
	}

	render() {
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">
							Board: {this.props.match.params.id}
						</h3>
					</div>
					<div className="panel-body">
						<h4><Link to="/">Go back to boards</Link></h4>
						Lists
					</div>
				</div>
			</div>
		);
	}
}

export default BoardView;