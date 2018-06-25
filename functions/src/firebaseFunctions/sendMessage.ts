import * as admin from 'firebase-admin';

export default async(req, res) => {

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
        await chat.add({
            from: from,
            to: to,
            message,
            time: +time
        })

        res.send({
            success: true
        });

    } catch (error) {
        res.status(500).send(error);
    }
    
};