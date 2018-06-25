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
});
//# sourceMappingURL=getUsername.js.map