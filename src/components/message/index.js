import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';

/**
 * Message
 */
class Message extends PureComponent {

	/**
	 * getMessageClass
	 */
	getMessageClass(msg) {
		if(msg.from === this.props.uid) {
			return "from-me"
		}

		return "to-me";
	}

	/**
	 * getTime
	 */
	getTime() {
		let date = new Date(this.props.message.time);
		return date.toLocaleTimeString()
	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.message}>
				<li
					className={"container " + this.getMessageClass(this.props.message)}
				>
					<div className="message">
						<p className="text">{this.props.message.message}</p>
						<p className="time">{this.getTime()}</p>
					</div>
				</li>
			</div>
		);
	}

}

export default injectSheet(styles)(Message);
