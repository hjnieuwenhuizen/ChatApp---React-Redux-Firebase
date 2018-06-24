import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import styles from './styles.js';
import Distractor from '../distractor';
import Contacts from '../contacts';
import Chat from '../chat';

/**
 * App
 */
class App extends Component {

	/**
	 * componentDidMount
	 */
	componentDidMount() {
		if(this.props.authKnown) {
			this.checkUserState();
		}
	}

	/**
	 * componentDidUpdate
	 */
	componentDidUpdate() {
		if(this.props.authKnown && !this.redirecting) {
			this.checkUserState();
		}
	}

	/**
	 * checkUserState
	 */
	checkUserState() {
		//redirect to auth route if not signed in
		if(!this.props.signedIn) {
			this.redirecting = true;
			this.props.history.push('auth');
			return;
		}

		//redirec user to page to edit username
		if(this.props.username === "") {
			this.redirecting = true;
			this.props.history.push('selectusername');
		}
	}

	/**
	 * getClassMobile
	 */
	getClassMobile() {
		if(this.props.selectedContact === null) {
			return "show-contacts";
		}
		return "hide-contacts";
	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;

		//show distractor if we still waiting for auth state
		if(!this.props.authKnown) {
			return <Distractor/>
		}

		return (
			<div className={classes.app}>
				<div className={"contacts-container " + this.getClassMobile()}>
					<Contacts/>
				</div>
				<div className={"chat-container " + this.getClassMobile()}>
					<Chat/>
				</div>
			</div>
		);
	}

}

/**
 * mapStateToProps
 * This connects the store to this component. Check the reducers folder to see all states
 * state {object} - redux store
 */
const mapStateToProps = (state) => {
    return {
		signedIn: state.user.signedIn,
		authKnown: state.user.authKnown,
		username: state.user.username,
		selectedContact: state.chat.selectedContact
	}
}

/**
 * mapDispatchToProps
 * This connects the actions to this component. Check the actions folder for all actions
 * dispatch {function} - redux dispatch action function
 */
const mapDispatchToProps = (dispatch) => {
    return {}
}

// Export component and connect actions and state
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(App)));
