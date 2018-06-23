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
const functions = require("firebase-functions");
const admin = require("firebase-admin");
//init firebase admin
admin.initializeApp();
//Returns the username for a given uid
exports.getUsername = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    try {
        //setup refs to database
        const usersCollection = admin.firestore().collection("users");
        const user = usersCollection.doc(req.query.uid);
        //run query
        const doc = yield user.get();
        if (doc.exists) {
            res.send({
                username: doc.data().username
            });
            return;
        }
        res.send({
            username: ""
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
//sets the username for a user
exports.saveUsername = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    try {
        let uid = req.query.uid;
        let username = req.query.username;
        //setup refs to database
        const usersCollection = admin.firestore().collection("users");
        const usernamesCollection = admin.firestore().collection("usernames");
        //get user
        const usernameDoc = yield usernamesCollection.doc(username).get();
        //username is already taken
        if (usernameDoc.exists) {
            res.send({
                success: false
            });
            return;
        }
        //run querys
        yield usersCollection.doc(uid).set({ username: username });
        yield usernamesCollection.doc(username).set({ uid: uid });
        res.send({
            success: true
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
//add contact
exports.addContact = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    try {
        //query parameters
        const uid = req.query.uid;
        const username = req.query.username;
        //setup refs to database
        const usersCollection = admin.firestore().collection("users");
        const usernamesCollection = admin.firestore().collection("usernames");
        //get contact details
        const usernamesQuerySnapshot = yield usernamesCollection.get();
        //THIS IS BAD! TEMP SOLUTION! Running out of time :-(
        //**********************************************************
        let contactDoc;
        let contactId = "";
        usernamesQuerySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.id.toLowerCase() === username.toLowerCase()) {
                contactId = doc.id;
                contactDoc = doc;
            }
        });
        //**********************************************************
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
                        uid: contactUID
                    });
                    //save current user for the contact as well
                    yield contactsCollection.doc(contactUID).collection("data").doc(chatID).set({
                        username: currentUsersUsername,
                        uid: uid
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
}));
//Sends message
exports.sendMessage = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    try {
        //query parameters
        const chatID = req.query.chatID;
        const from = req.query.from;
        const to = req.query.to;
        const message = req.query.message;
        //setup refs to database
        const chat = admin.firestore().collection("chats").doc(chatID).collection("data");
        //add message
        yield chat.add({
            from: from,
            to: to,
            message,
            time: (new Date).getTime()
        });
        res.send({
            success: true
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
//# sourceMappingURL=index.js.map