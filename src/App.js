import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boards: [], cookies: this.props.cookies
		};
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	getBoards() {
		axios.get('http://localhost:8080/boards')
			.then(res => {
				this.setState({ boards: res.data });
				this.state.cookies.set("boards", res.data, { maxAge: 3600 * 24, path: '/' });
			});
	}
	componentDidMount() {
		if (this.state.cookies.get("boards") !== undefined) {
			this.setState({ boards: this.state.cookies.get("boards") });
		}
		this.getBoards();
		this.interval = setInterval(() => this.getBoards(), 5000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
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

export default withCookies(App);