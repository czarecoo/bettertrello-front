import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css';
import Edit from './components/Edit';
import Create from './components/Create';
import Board from './components/Board';
import { Link } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<div>
			<div className="header">
				<div class="block left">
					<Link className="btn btn-info btn-sm homebtn" to={`/`}>
						<img src="home.png" alt="home" height="25" width="25"></img>
					</Link>
				</div>
				<div class="block center">
					<Link to={`/`}>
						<img className="logo" src="logo.png" alt="logo" height="30" width="170"></img>
					</Link>
				</div>
				<div class="block right">
					<Link className="btn btn-info btn-sm homebtn" to={`/`}>
						<img src="plus.png" alt="plus" height="25" width="25"></img>
					</Link>
				</div>
			</div>
			<Route exact path='/' component={App} />
			<Route path='/edit/:id' component={Edit} />
			<Route path='/create' component={Create} />
			<Route path='/board/:id' component={Board} />
		</div>
	</Router>,
	document.getElementById('root')
);
serviceWorker.unregister();