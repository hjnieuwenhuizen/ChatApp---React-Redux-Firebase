import request from '../modules/request';

/**
 * updateLastRead
 */
export const updateLastRead = (index) => {
	return async(dispatch, getState) => {

		//check if we had notifications that we should now clear
		try {

            let contacts = getState().chat.contacts;
			let uid = getState().user.user.uid;
            let time = new Date().getTime();

			//set post data
			let postData = "uid=" + uid + 
				"&contactuid=" + contacts[index].uid +
				"&contactUsername=" + contacts[index].username +
                "&chatID=" + contacts[index].chatID +
				"&time=" + time;
			

			let data = {
				...contacts[index]
			}

			data.lastRead = time;

			dispatch({type: 'UPDATE_CONTACT', payload: {
				index,
				data
			}});

			// Send request to update the last read
            await request("POST", "updateLastRead", postData);

		} catch (error) {
			console.log(error)
		}

	}
}