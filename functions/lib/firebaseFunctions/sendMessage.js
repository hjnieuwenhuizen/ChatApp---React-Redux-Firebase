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
        const chatID = req.query.chatID;
        const from = req.query.from;
        const to = req.query.to;
        const message = req.query.message;
        const time = req.query.time;
        //setup refs to database
        const chat = admin.firestore().collection("chats").doc(chatID).collection("data");
        //add message
        yield chat.add({
            from: from,
            to: to,
            message,
            time: +time
        });
        res.send({
            success: true
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//# sourceMappingURL=sendMessage.js.map