import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import injectSheet from 'react-jss';
import styles from './styles.js';
import SearchBar from '../searchBar';
import Distractor from '../distractor';
import { removeRealtimeActions } from '../../actions/realtimeActions'

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
	async signOut() {
		this.props.removeRealtimeActions();
		firebase.auth().signOut();
		this.props.history.push('auth');
	}

	/**
	 * contactClicked
	 */
	contactClicked(index) {
		this.props.selectContact(index);
	}

	/**
	 * contactsPlaceholder
	 */
	contactsPlaceholder() {
		if(this.props.contacts.length === 0) {

			if(this.props.gotContacts) {
				return (
					<div className="no-contacts">
						You have no contacts.
					</div>
				)
			}

			return (
				<div className='distractor-container'>
					<Distractor/>
				</div>
			)

		}
	}

	/**
	 * contacts
	 */
	contacts() {
		if(this.props.searching) {
			return <div></div>
		}

		return this.props.contacts.map((data, index) => {
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
	}

	/**
	 * searchResults
	 */
	searchResults() {
		if(!this.props.searching) {
			return <div></div>
		}

		if(this.props.searchResults.length === 0) {
			return <div>No contacts found.</div>
		}


		let searchResults = this.props.searchResults.map((data, index) => {
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
			<div className="search-results">
				<div className='label'>
					Search results:
				</div>
				<div className='results'>
					{searchResults}
				</div>
			</div>
		)
	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;

		const yourAddress = (
			<div className="your-username">
				<div>Welcome {this.props.username}</div>
			</div>
		)

		const addContact = <div className="add-contact" onClick={this.addContact.bind(this)}>Add Contact</div>
		const signOut = <div className="sign-out" onClick={this.signOut.bind(this)}>Sign Out</div>

		return (
			<div className={classes.contacts}>
				{yourAddress}
				<SearchBar/>
				<div className="contacts">
					{this.searchResults()}
					{this.contactsPlaceholder()}
					{this.contacts()}
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
		selectedContact: state.chat.selectedContact,
		gotContacts: state.chat.gotContacts,
		searching: state.chat.searching,
		searchResults: state.chat.searchResults
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
		removeRealtimeActions: () => dispatch(removeRealtimeActions()),
		selectContact: (index) => dispatch({type: 'SELECT_CONTACT', payload: index})
	}
}

// Export component and connect actions and state
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(Contacts)));
