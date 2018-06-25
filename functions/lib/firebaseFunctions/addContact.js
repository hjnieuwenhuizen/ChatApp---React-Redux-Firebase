"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
exports.default = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //query parameters
        const uid = req.query.uid;
        const username = req.query.username;
        //setup refs to database
        const usersCollection = admin.firestore().collection("users");
        const usernamesCollection = admin.firestore().collection("usernames");
        //get contact details
        const usernamesQuerySnapshot = yield usernamesCollection.get();
        //Not the greatest solution to find a contact - where statement was not working. To fix
        let contactDoc;
        let contactId = "";
        usernamesQuerySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.id.toLowerCase() === username.toLowerCase()) {
                contactId = doc.id;
                contactDoc = doc;
            }
        });
        //does this contact exist?
        if (contactDoc) {
            if (contactDoc.exists) {
                //get contact uid
                const contactUID = contactDoc.data().uid;
                const currentUser = yield usersCollection.doc(uid).get();
                if (currentUser.exists) {
                    const currentUsersUsername = currentUser.data().username;
                    //Cannot add yourself as a contact check
                    if (username === currentUsersUsername) {
                        res.send({
                            success: false,
                            errorMsg: "Cannot add yourself as a contact"
                        });
                        return;
                    }
                    //TODO: Add contact request functionality
                    //Add the contact to for both users
                    const contactsCollection = admin.firestore().collection("contacts");
                    //chat id
                    const chatID = (new Date).getTime().toString();
                    //save for current user
                    yield contactsCollection.doc(uid).collection("data").doc(chatID).set({
                        username: contactId,
                        uid: contactUID,
                        lastRead: new Date().getTime()
                    });
                    //save current user for the contact as well
                    yield contactsCollection.doc(contactUID).collection("data").doc(chatID).set({
                        username: currentUsersUsername,
                        uid: uid,
                        lastRead: new Date().getTime()
                    });
                    res.send({
                        success: true
                    });
                    return;
                }
                res.send({
                    success: false,
                    errorMsg: "Please contact support as we have a problem"
                });
                return;
            }
        }
        res.send({
            success: false,
            errorMsg: "User does not exist"
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//# sourceMappingURL=addContact.js.map