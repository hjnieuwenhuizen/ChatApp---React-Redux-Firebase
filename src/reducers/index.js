import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const allReducers = combineReducers({
	user: userReducer,
	chat: chatReducer
})

export default allReducers
