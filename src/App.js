import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			boards: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:8080/boards')
			.then(res => {
				this.setState({ boards: res.data });
			});
	}

	render() {
		return (
			<div className="container cont">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">
							Boards
            			</h3>
					</div>
					<div className="panel-body">
						<ul className="list">
							{this.state.boards.map((board, index) =>
								<Link key={index} to={`/board/${board.id}`}>
									<li className="boardMin">
										{board.name}
									</li>
								</Link>
							)}
							<Link to="/create">
								<li className="boardMin">
									Create board
							</li>
							</Link>
						</ul>
					</div>
				</div>
			</div >
		);
	}
}

export default App;