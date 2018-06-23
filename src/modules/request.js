import firebase from '../firebase';
import firebaseConfig from '../firebaseConfig';

export default (type, path, data) => {
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
        let region = firebase.functions().region_;
        let url = "https://" + region + "-" + firebaseConfig.projectId + ".cloudfunctions.net/" + path;
        
        xhr.open(type, url + "?" + data);
        
        xhr.send(data);
    });
}