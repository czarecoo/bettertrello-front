import React, { Component } from 'react';
import axiosInstance from './axiosInstance';
import { Link } from 'react-router-dom';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: {}
		};
	}

	componentDidMount() {
		axiosInstance.get('/contacts/' + this.props.match.params.id)
			.then(res => {
				this.setState({ contact: res.data });
			});
	}

	onChange = (e) => {
		const state = this.state.contact
		state[e.target.name] = e.target.value;
		this.setState({ contact: state });
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { name, address, city, postalCode, phone } = this.state.contact;

		axiosInstance.put('/contacts/' + this.props.match.params.id, { name, address, city, postalCode, phone })
			.then((result) => {
				this.props.history.push("/show/" + this.props.match.params.id)
			});
	}

	render() {
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">
							EDIT Contact
            			</h3>
					</div>
					<div className="panel-body">
						<h4><Link to={`/show/${this.state.contact.id}`}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Contact List</Link></h4>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="name">Name:</label>
								<input type="text" className="form-control" name="name" defaultValue={this.state.contact.name} onChange={this.onChange} placeholder="Name" />
							</div>
							<div className="form-group">
								<label htmlFor="title">Address:</label>
								<input type="text" className="form-control" name="address" defaultValue={this.state.contact.address} onChange={this.onChange} placeholder="Address" />
							</div>
							<div className="form-group">
								<label htmlFor="author">City:</label>
								<input type="text" className="form-control" name="city" defaultValue={this.state.contact.city} onChange={this.onChange} placeholder="City" />
							</div>
							<div className="form-group">
								<label htmlFor="published_date">Phone Number:</label>
								<input type="text" className="form-control" name="phone" defaultValue={this.state.contact.phone} onChange={this.onChange} placeholder="Phone Number" />
							</div>
							<div className="form-group">
								<label htmlFor="description">Email:</label>
								<input type="email" className="form-control" name="email" defaultValue={this.state.contact.email} onChange={this.onChange} placeholder="Email Address" />
							</div>
							<button type="submit" className="btn btn-default">Update</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Edit;