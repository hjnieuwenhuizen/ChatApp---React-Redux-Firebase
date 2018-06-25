import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import getUsername from './firebaseFunctions/getUsername';
import saveUsername from './firebaseFunctions/saveUsername';
import addContact from './firebaseFunctions/addContact';
import sendMessage from './firebaseFunctions/sendMessage';
import updateLastRead from './firebaseFunctions/updateLastRead';

//init firebase admin
admin.initializeApp();

/**
 * router
 */
const router = (req, res) => {
    //route request
    switch (req.path) {
        case "/getUsername":
            return getUsername(req, res);
        case "/saveUsername":
            return saveUsername(req, res);
        case "/addContact":
            return addContact(req, res);
        case "/sendMessage":
            return sendMessage(req, res);
        case "/updateLastRead":
            return updateLastRead(req, res);
        default:
            return res.status(500).send("No path");
    }
}

/**
 * server
 */
exports.server = functions.https.onRequest(async(req, res) => {

    //CORS
    res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }

    //check auth
    try {

        const tokenId = req.get('Authorization').split('Bearer ')[1];
        await admin.auth().verifyIdToken(tokenId);

        //route request
        return router(req, res);

    } catch (error) {
        res.status(401).send(error)
    }

});

