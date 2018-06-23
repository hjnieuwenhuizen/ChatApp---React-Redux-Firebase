import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import styles from './styles.js';
import Distractor from '../distractor';
import request from '../../modules/request';

/**
 * SelectUsername
 */
class SelectUsername extends Component {

	state = {
		username: "",
		errorMsg: "",
		loading: false
	}

	/**
	 * componentDidUpdate
	 */
	componentDidUpdate() {
		//redirect to auth view if not logged in
		if(this.props.authKnown && !this.props.signedIn) {
			this.props.history.push('auth');
			return;
		}

		//check that this user does not already have a username
		if(this.props.username !== null && this.props.username !== "") {
			this.props.history.push('');
		}
	}

	/**
	 * usernameChanged
	 */
	usernameChanged(e) {
		this.setState({
			username: e.target.value
		})
	}

	/**
	 * save
	 */
	async save(e) {

		this.setState({
			errorMsg: "",
			loading: true
		})

		e.preventDefault();

		try {
			//set post data
			let postData = "username=" + this.state.username + "&uid=" + this.props.user.uid;

			// Send request to save username
			const result = await request("POST", "saveUsername", postData);

			if(result.success) {
				//success redirect to app
				this.props.setUsername(this.state.username);
				this.props.history.push('');
				return;
			}

			this.setState({
				errorMsg: "Username already taken",
				loading: false
			})

		} catch (error) {
			this.setState({
				errorMsg: "Internal server error",
				loading: false
			})
		}

	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;

		if(this.props.username === null || this.state.loading) {
			return <Distractor/>
		}

		return (
			<div className={classes.selectUsername}>
				<form className="container" onSubmit={this.save.bind(this)}>
					<div className="error">{this.state.errorMsg}</div>
					<input
						type="text"
						maxLength="15"
						placeholder="Username"
						onChange={this.usernameChanged.bind(this)}
						autoFocus
						required
					/>
					<button
						type="submit"
					>
						SAVE
					</button>
				</form>
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
		setUsername: (username) => dispatch({type: 'SET_USERNAME', payload: username})
	}
}

// Export component and connect actions and state
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(SelectUsername)));
