import firebase from '../firebase';

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

//Listen for contacts
export const contacts = (uid) => {
	return (dispatch) => {

        try {
            //attach event listner
            firestore.collection("contacts").doc(uid).collection("data")
                .orderBy("username")
                .onSnapshot(function(snapshot) {
                    snapshot.docChanges().forEach(function(change) {
                        let data = {
                            ...change.doc.data(),
                            chatID: change.doc.id
                        }
                        dispatch(messages(data));
                        dispatch({type: 'ADD_CONTACT', payload: data});
                    });
                });
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
            firestore.collection("chats").doc(contact.chatID).collection("data")
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
        } catch (error) {
            console.log(error);
        }

	}
}