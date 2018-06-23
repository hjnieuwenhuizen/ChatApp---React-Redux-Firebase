export default function (state = {
		signedIn: false,
		authKnown: false,
		username: null,
		user: null
	}, action) {
	switch (action.type) {
		case 'SIGNED_IN':
			return {
				...state,
				signedIn: true,
				authKnown: true,
				user: action.payload
			}
		case 'SET_USERNAME':
			return {
				...state,
				username: action.payload
			}
		case 'SIGNED_OUT':
			return {
				...state,
				signedIn: false,
				authKnown: true,
				user: null,
				username: null
			}
		default:

	}
	return state;
}
