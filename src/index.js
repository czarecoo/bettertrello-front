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
import Header from './components/Header';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
	<CookiesProvider>
		<Router>
			<div className="routerDiv">
				<Header></Header>
				<Route exact path='/' component={App} />
				<Route path='/edit/:id' component={Edit} />
				<Route path='/create' component={Create} />
				<Route path='/board/:id' component={Board} />
			</div>
		</Router>
	</CookiesProvider>,
	document.getElementById('root')
);
serviceWorker.unregister();