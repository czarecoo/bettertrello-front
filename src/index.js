import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import history from './components/history';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Create from './components/Create';
import Board from './components/Board';
import Header from './components/Header';
import { CookiesProvider } from 'react-cookie';
import MainView from './components/MainView';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
	position: 'bottom center',
	timeout: 5000,
	offset: '30px',
	transition: 'scale'
}

ReactDOM.render(
	<AlertProvider template={AlertTemplate} {...options}>
		<CookiesProvider>
			<Router history={history}>
				<div className="routerDiv">
					<Header />
					<Route exact path='/' component={MainView} />
					<Route path='/create' component={Create} />
					<Route path='/board/:id' component={Board} />
				</div>
			</Router>
		</CookiesProvider>
	</AlertProvider>,
	document.getElementById('root')
);
serviceWorker.unregister();