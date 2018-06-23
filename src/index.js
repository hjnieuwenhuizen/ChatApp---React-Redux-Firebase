import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import firebase from './firebase';
import router from './router';
import request from './modules/request';
import { contacts } from './actions/realtimeActions';

//listen to auth change
firebase.auth().onAuthStateChanged(async(user) => {
	if (user) {

		//kick off realtime updates
		store.dispatch(contacts(user.uid));

		//Get data
		try {
			// Send request to get username
			const usernameResult = await request("GET", "getUsername", "uid=" + user.uid);
			store.dispatch(
				{
					type: 'SET_USERNAME', 
					payload: (usernameResult.username !== "" ? usernameResult.username : "")
				}
			);

		} catch (error) {
			store.dispatch({type: 'SET_USERNAME', payload: ""});
		}
		
		store.dispatch({type: 'SIGNED_IN', payload: user});

	} else {
		store.dispatch({type: 'SIGNED_OUT', payload: {}});
	}
});


//render app
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			{router}
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);