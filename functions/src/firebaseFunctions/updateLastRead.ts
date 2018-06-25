import * as admin from 'firebase-admin';

export default async(req, res) => {

    try {

        //query parameters
        const uid = req.query.uid;
        const contactuid = req.query.contactuid;
        const contactUsername = req.query.contactUsername;
        const chatID = req.query.chatID;
        const time = req.query.time;

        //Contacts collection
        const contactsCollection = admin.firestore().collection("contacts");

        //update contact
        await contactsCollection.doc(uid).collection("data").doc(chatID).set({
            username: contactUsername,
            uid: contactuid,
            lastRead: +time
        })

        res.send({
            success: true
        });

    } catch (error) {
        res.status(500).send(error);
    }
    
};