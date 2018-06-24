import firebase from '../firebase';

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

//Listen for contacts
export const contacts = (uid) => {
	return (dispatch, getState) => {

        try {
            //attach event listner
            let eventListner = firestore.collection("contacts").doc(uid).collection("data")
                .orderBy("username")
                .onSnapshot(function(snapshot) {

                    dispatch({type: 'GOT_CONTACTS', payload: {}});
                    let currentContact = getState().chat.contacts;

                    snapshot.docChanges().forEach(function(change) {

                        let index;
                        let flag = false;

                        for (let i = 0; i < currentContact.length; i++) {
                            if(change.doc.id === currentContact[i].chatID) {
                                index = i;
                                flag = true;
                            }
                        }

                        let data = {
                            ...change.doc.data(),
                            chatID: change.doc.id
                        }

                        if(!flag) {
    
                            dispatch({type: 'ADD_CONTACT', payload: data});
                            dispatch(messages(data));

                        } else {

                            dispatch({type: 'UPDATE_CONTACT', payload: {
                                index,
                                data
                            }});

                        }

                    });

                });
            window.chatEvents.push(eventListner);
        } catch (error) {
            console.log(error);
        }

	}
}

//Listen for messages
export const messages = (contact) => {
	return (dispatch) => {

        try {
            //attach event listner
            let eventListner = firestore.collection("chats").doc(contact.chatID).collection("data")
                .orderBy("time")    
                .onSnapshot(function(snapshot) {
                    snapshot.docChanges().forEach(function(change) {
                        let data = {
                            ...change.doc.data(),
                            chatID: contact.chatID
                        }
                        dispatch({type: 'ADD_MESSAGE', payload: data});
                    });
                });
            window.chatEvents.push(eventListner);
        } catch (error) {
            console.log(error);
        }

	}
}

/**
 * removeRealtimeActions
 */
export const removeRealtimeActions = () => {
	return (dispatch) => {

        try {
            window.chatEvents.forEach(event => {
                //unsubscribe
                event();
            });
            window.chatEvents = [];
        } catch (error) {
            console.log(error);
        }

	}
}