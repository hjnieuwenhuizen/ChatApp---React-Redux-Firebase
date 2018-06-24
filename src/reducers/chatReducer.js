export default function (state = {
		selectedContact: null,
		gotContacts: false,
		contacts: [],
		chats: [],
		searching: false,
		searchResults: []
	}, action) {
	switch (action.type) {
		case 'GOT_CONTACTS':
			return {
				...state,
				gotContacts: true
			}
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [
					...state.contacts,
					action.payload
				]
			}
		case 'UPDATE_CONTACT':

			let contacts = [...state.contacts];

			contacts[action.payload.index] = action.payload.data;

			return {
				...state,
				contacts: contacts
			}
		case 'SELECT_CONTACT':
			return {
				...state,
				selectedContact: action.payload
			}
		case 'ADD_MESSAGE':

			//THIS NEEDS WORK

			let chats = [...state.chats];

			let chatsFlag = false;
			
			chats
				.map((data, index) => {
					if(data.chatID === action.payload.chatID) {
						chatsFlag = true;
						return chats[index].messages = [
							...chats[index].messages,
							action.payload
						]
					}
					return ""
				})

			if(!chatsFlag) {
				chats.push({
					chatID: action.payload.chatID,
					messages: [
						action.payload
					]
				})
			}

			return {
				...state,
				chats: chats
			}
		case 'SEARCH_STATE':
			return {
				...state,
				searching: action.payload
			}
		case 'SET_SEARCH_RESULTS':
			return {
				...state,
				searchResults: action.payload
			}
		default:
	}
	return state;
}
