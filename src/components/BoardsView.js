import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from './history';

class BoardsView extends Component {
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
		axiosInstance.get('/boards')
			.then(res => {
				this.setState({ boards: res.data });
				this.state.cookies.set("boards", res.data, { maxAge: 3600 * 24, path: '/' });
			}).catch(() => {
				this.state.cookies.remove("boards");
				this.state.cookies.remove("username");
				this.state.cookies.remove("token");
				this.state.cookies.remove("refresh_token");
				history.push('/');
			});
	}
	componentDidMount() {
		if (this.state.cookies.get("boards") !== undefined) {
			this.setState({ boards: this.state.cookies.get("boards") });
		}
		if (this.state.cookies.get("username") !== undefined && this.state.cookies.get("token") !== undefined && this.state.cookies.get("refresh_token") !== undefined) {
			axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.cookies.get("token");
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
						<h1 className="panel-title">
							Boards
            			</h1>
					</div>
					<div className="panel-body">
						<ul className="list">
							{this.state.boards.map((board, index) =>
								<Link key={index} to={`/board/${board.id}`}>
									<li className="boardMin" style={{ background: board.color }}>
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

export default withCookies(BoardsView);