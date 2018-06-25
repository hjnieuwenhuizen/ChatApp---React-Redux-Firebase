import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './styles.js';
import request from '../../modules/request.js';
import Distractor from '../distractor';
import Message from '../message';

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
	 * componentDidMount
	 */
	componentDidMount() {
		this.scrollToBottom();
	}

	/**
	 * componentDidUpdate
	 */
	componentDidUpdate() {
		this.scrollToBottom();
	}

	/**
	 * scrollToBottom
	 */
	scrollToBottom() {
		let element = document.getElementById("chatWindow");
		if(element !== null) {
			element.scrollTop = element.scrollHeight;
		}
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

		if(this.state.message === "") {
			return;
		}

		e.preventDefault();

		this.setState({
			loading: true
		})

		try {
			//set post data
			const contact = this.props.contacts[this.props.selectedContact];
			const from = this.props.user.uid;
			const to = contact.uid;
			const chatID = contact.chatID;
			const message = this.state.message;
			let time = new Date().getTime()
			const postData = "from=" + from + 
				"&to=" + to +
				"&chatID=" + chatID +
				"&message=" + message +
				"&time=" + time;
			
			// Send request to save username
			await request("POST", "sendMessage", postData);

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
	 * back
	 */
	back() {
		this.props.selectContact(null);
	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;

		if(this.props.selectedContact === null) {
			return (
				<div id="chat" className={classes.chat}>
					<div className="no-chat-selected">Please select a contact on the right.</div>
				</div>
			);
		}

		//messages
		let messages = this.props.chats
			.filter(data => data.chatID === this.props.contacts[this.props.selectedContact].chatID)
			.map((data) => {
				return data.messages
					.map((message, index) => {
						return (
							<Message
								key={index} 
								message={message}
								uid={this.props.user.uid}
							/>
						)
					})
			})

		return (
			<div id="chat" className={classes.chat}>
				<div className='head'>
					<div className='back' onClick={this.back.bind(this)}>&laquo;</div>
					<div className="username">{this.props.contacts[this.props.selectedContact].username}</div>
				</div>	
				<div id="chatWindow" className="chat">
					<ol className="conversation">
						{messages}
						<div 
							ref={el => { this.messagesEnd = el; }}
							className="message-end"
						>
						</div>
					</ol>
				</div>
				<div className="send">
					<form 
						className="container" 
						onSubmit={this.send.bind(this)} 
					>
						<input
							type="text"
							placeholder="Message"
							onChange={this.updateSendTxt.bind(this)}
							value={this.state.message}
							disabled={this.state.loading}
							required
						/>
						<button
							type="submit"
							disabled={this.state.loading}
						>
							SEND
						</button>
						{
							this.state.loading ?
							<div className="distractor-containter"><Distractor/></div>
							:
							<div></div>
						}
					</form>
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
    return {
		selectContact: (index) => dispatch({type: 'SELECT_CONTACT', payload: index}),
	}
}

// Export component and connect actions and state
export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(Chat));
