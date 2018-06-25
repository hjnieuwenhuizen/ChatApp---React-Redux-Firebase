import * as admin from 'firebase-admin';

export default async(req, res) => {

    try {

        //setup refs to database
        const usersCollection = admin.firestore().collection("users");
        const user = usersCollection.doc(req.query.uid);

        //run query
        const doc = await user.get();

        if (doc.exists) {

            res.send({
                username: doc.data().username
            });
            return;

        }        

        res.send({
            username: ""
        });
        
    } catch (error) {
        res.status(500).send(error);
    }

};