import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import styles from './styles.js';
//import Distractor from '../distractor';

/**
 * Contacts
 */
class Contacts extends Component {

	/**
	 * addContact
	 */
	addContact() {
		this.props.history.push('addcontact');
	}

	/**
	 * signOut
	 */
	signOut() {
		this.props.signOut();
		this.props.history.push('auth');
	}

	/**
	 * contactClicked
	 */
	contactClicked(index) {
		this.props.selectedContact(index);
	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;

		const yourAddress = (
			<div className="your-username">
				<strong>Your username is:</strong>
				<div>{this.props.username}</div>
			</div>
		)

		//TODO: move these to their own components
		const addContact = <div className="add-contact" onClick={this.addContact.bind(this)}>Add Contact</div>
		const signOut = <div className="sign-out" onClick={this.signOut.bind(this)}>Sign Out</div>
		const contacts = this.props.contacts.map((data, index) => {
			return (
				<div 
					key={index} 
					className="contact" 
					onClick={this.contactClicked.bind(this, index)}
				>
					{data.username}
				</div>
			)
		})

		return (
			<div className={classes.contacts}>
				{yourAddress}
				<div className="contacts">
					{
						this.props.contacts.length === 0 ? 
						<div className="no-contacts">
							You have no contacts.
						</div>
						:
						<div></div>
					}
					{contacts}
				</div>
				{addContact}
				{signOut}
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
		contacts: state.chat.contacts,
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
    return {
		signOut: () => dispatch({type: 'SIGNED_OUT', payload: {}}),
		selectedContact: (index) => dispatch({type: 'SELECT_CONTACT', payload: index})
	}
}

// Export component and connect actions and state
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(Contacts)));
