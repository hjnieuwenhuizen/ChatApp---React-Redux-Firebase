import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';

/**
 * Distractor
 */
class Distractor extends Component {

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.distractorContainer}>
				<div className="distractor"></div>
			</div>
		);
	}

}

export default injectSheet(styles)(Distractor);
