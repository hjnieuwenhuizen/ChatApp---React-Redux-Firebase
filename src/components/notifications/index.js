import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './styles.js';

/**
 * Notifications
 */
class Notifications extends Component {

	/**
	 * getNotifications
	 */
	getNotifications() {
		let contact = this.props.contacts[this.props.contact];

		let messages = this.props.chats
			.filter(data => data.chatID === contact.chatID)
			.map((data) => {
				return data.messages
					.filter(message => contact.lastRead < message.time)
					.map((message) => {
						return message;
					})
			})
		
		if(messages.length > 0) {
			if(messages[0].length > 0) {
				return <div className="count">{messages[0].length}</div>
			}
		}	

		return <div></div>
	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.notifications}>
				{this.getNotifications()}
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
		chats: state.chat.chats
	}
}

// Export component and connect actions and state
export default connect(mapStateToProps)(injectSheet(styles)(Notifications));
