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
        const contactuid = req.query.contactuid;
        const contactUsername = req.query.contactUsername;
        const chatID = req.query.chatID;
        const time = req.query.time;
        //Contacts collection
        const contactsCollection = admin.firestore().collection("contacts");
        //update contact
        yield contactsCollection.doc(uid).collection("data").doc(chatID).set({
            username: contactUsername,
            uid: contactuid,
            lastRead: +time
        });
        res.send({
            success: true
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//# sourceMappingURL=updateLastRead.js.map