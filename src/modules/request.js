import firebase from '../firebase';
import firebaseConfig from '../firebaseConfig';
import store from '../store';

export default (type, path, data, token) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.response);
            }
        });

        xhr.onerror = function() {
            reject(xhr.statusText);
        };

        //construct url
        //prod
        let region = firebase.functions().region_;
        let url = "https://" + region + "-" + firebaseConfig.projectId + ".cloudfunctions.net/server/" + path;
        
        //dev
        //let url = "http://localhost:5000/chatapp-781e8/us-central1/server/" + path;

        xhr.open(type, url + "?" + data);

        let tokenData = token;

        if(token === undefined) {
            tokenData = store.getState().user.user.qa;
        }

        //set auth
        xhr.setRequestHeader('Authorization', 'Bearer ' + tokenData);

        xhr.send(data);
    });
}