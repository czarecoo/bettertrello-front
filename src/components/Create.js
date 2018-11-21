import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { withAlert } from 'react-alert';

class Create extends Component {
	constructor() {
		super();
		this.state = {
			name: '', color: 'grey'
		};
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onCreate(e) {
		e.preventDefault();
		if (this.state.name !== '' && this.state.color !== '') {
			axiosInstance.post('/boards', { "name": this.state.name, "color": this.state.color })
				.then((result) => {
					if (result.status === 201) {
						this.props.history.push("/");
					} else {
						this.props.alert.error('Creation of board failed');
					}

				}).catch(() => {
					this.props.alert.error('Creation of board failed');
				});
		} else {
			this.props.alert.error("Cannot create board without name");
		}

	}

	render() {
		const { name } = this.state;
		return (
			<div className="container cont">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">
							Create board <div className="btn btn-default" style={{ background: this.state.color }}></div>
						</h3>

					</div>
					<div className="panel-body">
						<div className="form-group">
							<label>Name:</label>
							<input type="text" className="form-control" name="name" value={name} onChange={this.handleChange.bind(this)} placeholder="Enter new board name" />
							<ul>
								<li><button className="btn btn-default" onClick={this.handleChange.bind(this)} name={"color"} value={"grey"} style={{ background: "grey" }}></button></li>
								<li><button className="btn btn-default" onClick={this.handleChange.bind(this)} name={"color"} value={"red"} style={{ background: "red" }}></button></li>
								<li><button className="btn btn-default" onClick={this.handleChange.bind(this)} name={"color"} value={"blue"} style={{ background: "blue" }}></button></li>
								<li><button className="btn btn-default" onClick={this.handleChange.bind(this)} name={"color"} value={"green"} style={{ background: "green" }}></button></li>
								<li><button className="btn btn-default" onClick={this.handleChange.bind(this)} name={"color"} value={"brown"} style={{ background: "brown" }}></button></li>
							</ul>
						</div>
						<button onClick={this.onCreate.bind(this)} className="btn btn-default">Submit</button>
					</div>
				</div>
			</div>
		);
	}
}

export default withAlert(Create);