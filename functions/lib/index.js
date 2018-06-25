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
const getUsername_1 = require("./firebaseFunctions/getUsername");
const saveUsername_1 = require("./firebaseFunctions/saveUsername");
const addContact_1 = require("./firebaseFunctions/addContact");
const sendMessage_1 = require("./firebaseFunctions/sendMessage");
const updateLastRead_1 = require("./firebaseFunctions/updateLastRead");
//init firebase admin
admin.initializeApp();
/**
 * router
 */
const router = (req, res) => {
    //route request
    switch (req.path) {
        case "/getUsername":
            return getUsername_1.default(req, res);
        case "/saveUsername":
            return saveUsername_1.default(req, res);
        case "/addContact":
            return addContact_1.default(req, res);
        case "/sendMessage":
            return sendMessage_1.default(req, res);
        case "/updateLastRead":
            return updateLastRead_1.default(req, res);
        default:
            return res.status(500).send("No path");
    }
};
/**
 * server
 */
exports.server = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    //CORS
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    //check auth
    try {
        const tokenId = req.get('Authorization').split('Bearer ')[1];
        yield admin.auth().verifyIdToken(tokenId);
        //route request
        return router(req, res);
    }
    catch (error) {
        res.status(401).send(error);
    }
}));
//# sourceMappingURL=index.js.map