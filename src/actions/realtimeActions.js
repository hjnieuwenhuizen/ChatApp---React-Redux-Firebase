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
                .onSnapshot(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = {
                            ...doc.data(),
                            chatID: doc.id
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
                .onSnapshot(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = {
                            ...doc.data(),
                            chatID: contact.chatID
                        }
                        dispatch({type: 'ADD_MESSAGE', payload: data})
                    });
                });
        } catch (error) {
            console.log(error);
        }

	}
}