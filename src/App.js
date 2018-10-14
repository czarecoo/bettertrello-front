import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			boards: [{ id: 123, name: "dupa" }]
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
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">
							Boards
            			</h3>
					</div>
					<div className="panel-body">
						<ul className="list">
							{this.state.boards.map((board, index) =>
								<li key={index}>
									<Link to={`/BoardView/${board.id}`}>{board.name}</Link>
								</li>
							)}
							<li>
								<Link to="/create">Create board</Link>
							</li>
						</ul>
					</div>
				</div>
			</div >
		);
	}
}

export default App;