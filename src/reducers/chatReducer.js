export default function (state = {
		selectedContact: null,
		contacts: [],
		chats: []
	}, action) {
	switch (action.type) {
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [
					...state.contacts,
					action.payload
				]
			}
		case 'SELECT_CONTACT':
			return {
				...state,
				selectedContact: action.payload
			}
		case 'ADD_MESSAGE':

			//THIS NEEDS WORK

			let chats = [...state.chats];

			let flag = false;
			
			chats
				.filter(data => data.chatID === action.payload.chatID)
				.map((data, index) => {
					flag = true;
					return chats[index].messages = [
						...chats[index].messages,
						action.payload
					]
				})

			if(!flag) {
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
		default:
	}
	return state;
}
