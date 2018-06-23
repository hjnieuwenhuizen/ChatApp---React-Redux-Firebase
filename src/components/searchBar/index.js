import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './styles.js';

/**
 * SearchBar
 */
class SearchBar extends Component {

	state = {
		search: ""
	}

	/**
	 * updateSearch
	 */
	updateSearch(e) {
		this.setState({
			search: e.target.value
		})
	}

	/**
	 * search
	 */
	search(e) {
		e.preventDefault();

		if(this.state.search === "") {
			this.props.setSearchState(false);
			this.props.searchResults([]);
			return;
		}

		this.props.setSearchState(true);

		let results = this.props.contacts
			.filter((data) => data.username.toLowerCase().includes(this.state.search.toLowerCase()))
			.map((data) => {
				return data
			})
	
		this.props.searchResults(results);
	}

	/**
	 * clear
	 */
	clear() {
		this.props.setSearchState(false);
		this.props.searchResults([]);
		this.setState({
			search: ""
		})
	}

	/**
	 * render
	 */
	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.searchBar}>
				<form onSubmit={this.search.bind(this)}>
					<input
						type="text"
						maxLength="15"
						placeholder="Search Contacts"
						onChange={this.updateSearch.bind(this)}
						value={this.state.search}
					/>
					{
						this.props.searching ?
						<div className="close" onClick={this.clear.bind(this)}>Clear</div>
						:
						<div></div>
					}
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
		contacts: state.chat.contacts,
		chats: state.chat.chats,
		searching: state.chat.searching
	}
}

/**
 * mapDispatchToProps
 * This connects the actions to this component. Check the actions folder for all actions
 * dispatch {function} - redux dispatch action function
 */
const mapDispatchToProps = (dispatch) => {
    return {
		searchResults: (results) => dispatch({type: 'SET_SEARCH_RESULTS', payload: results}),
		setSearchState: (state) => dispatch({type: 'SEARCH_STATE', payload: state})
	}
}

// Export component and connect actions and state
export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(SearchBar));
