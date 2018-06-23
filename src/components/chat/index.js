import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './styles.js';
import request from '../../modules/request.js';
import Distractor from '../distractor';

/**
 * Chat
 */
class Chat extends Component {

	//state
	state = {
		message: "",
		loading: false
	}

	/**
	 * updateSendTxt
	 */
	updateSendTxt(e) {
		this.setState({
			message: e.target.value
		})
	}

	/**
	 * send
	 */
	async send(e) {

		e.preventDefault();

		this.setState({
			loading: true
		})

		try {
			//set post data
			const contact = this.props.contacts[this.props.selectedContact];
			const from = contact.uid;
			const to = this.props.user.uid;
			const chatID = contact.chatID;
			const message = this.state.message;
			const postData = "from=" + from + 
				"&to=" + to +
				"&chatID=" + chatID +
				"&message=" + message;
			


			// Send request to save username
			const result = await request("POST", "sendMessage", postData);

			//reset
			this.setState({
				message: "",
				loading: false
			})

		} catch (error) {
			console.log("!!!!!!", error)
			//TODO: handle this
		}

	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;

		if(this.props.selectedContact === null) {
			return (
				<div className={classes.chat}>
					<div className="no-chat-selected">Please select a contact on the right.</div>
				</div>
			);
		}

		//messages
		let messages = this.props.chats
			.filter(data => data.chatID === this.props.contacts[this.props.selectedContact].chatID)
			.map((data) => {
				//TODO - add class for styling of from and to
				return data.messages.map((message, index) => {
					return (
						<div 
							key={index} 
							className='message'
						>
							{message.message}
						</div>
					)
				})

			})

		return (
			<div className={classes.chat}>
				<div className="chat">
					{messages}
				</div>
				<div className="send">
					{
						this.state.loading ?
						<Distractor/>
						:
						<form 
							className="container" 
							onSubmit={this.send.bind(this)} 
						>
							<input
								type="text"
								placeholder="Message"
								onChange={this.updateSendTxt.bind(this)}
								value={this.state.message}
								autoFocus
								required
							/>
							<button
								type="submit"
							>
								SEND
							</button>
						</form>
					}
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
		contacts: state.chat.contacts,
		selectedContact: state.chat.selectedContact,
		chats: state.chat.chats,
		user: state.user.user
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
export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(Chat));
