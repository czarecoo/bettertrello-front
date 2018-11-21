import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { Link } from 'react-router-dom';

class Create extends Component {

	constructor() {
		super();
		this.state = {
			name: '', cardLists: []
		};
	}
	onChange = (e) => {
		const state = this.state
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { name, cardLists } = this.state;

		axiosInstance.post('/boards', { name, cardLists })
			.then((result) => {
				this.props.history.push("/")
			});
	}

	render() {
		const { name } = this.state;
		return (
			<div className="container cont">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">
							Create board
            			</h3>
					</div>
					<div className="panel-body">
						<h4><Link to="/">Cancel</Link></h4>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>Name:</label>
								<input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Enter new board name" />
							</div>
							<button type="submit" className="btn btn-default">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Create;