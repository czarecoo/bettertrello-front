import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './components/axiosInstance';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from './components/history';

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
		this.getBoards();
		this.interval = setInterval(() => this.getBoards(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="container cont">
				<div className="panel panel-default">
					<button onClick={this.props.logout}>Logout</button>
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