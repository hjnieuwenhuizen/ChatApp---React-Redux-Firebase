import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const App = Loadable({
	loader: () => import('./components/app'),
	loading: () => <div></div>,
});

const Auth = Loadable({
	loader: () => import('./components/auth'),
	loading: () => <div></div>,
})

const AddContact = Loadable({
	loader: () => import('./components/addContact'),
	loading: () => <div></div>,
})

const SelectUsername = Loadable({
	loader: () => import('./components/selectUsername'),
	loading: () => <div></div>,
})

const router = (
	<Switch>
		<Route exact path='/' component={App}/>
		<Route exact path='/auth' component={Auth}/>
		<Route exact path='/selectusername' component={SelectUsername}/>
		<Route exact path='/addcontact' component={AddContact}/>
	</Switch>
);

export default router;
