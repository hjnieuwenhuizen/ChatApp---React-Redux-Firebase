import * as admin from 'firebase-admin';

export default async(req, res) => {

    try {

        const uid = req.query.uid;
        const username = req.query.username;

        //setup refs to database
        const usersCollection = admin.firestore().collection("users");
        const usernamesCollection = admin.firestore().collection("usernames");

        //get user
        const usernameDoc = await usernamesCollection.doc(username).get();

        //username is already taken
        if (usernameDoc.exists) {

            res.send({
                success: false
            });
            return;

        }   

        //run querys
        await usersCollection.doc(uid).set({username: username});
        await usernamesCollection.doc(username).set({uid: uid});

        res.send({
            success: true
        });
        
    } catch (error) {
        res.status(500).send(error);
    }
    
};