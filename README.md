# ChatApp---React-Redux-Firebase
A chat application using ReactJS, Redux and Google Firebase.

# TODOs
* Optimizations: 
    * Check for any state mutations
    * Check for any unnecessary re-renders
    * Lazy load chat messages
* Fix temp solution in addContact cloud function
* Split components into pure componenets and containers.
* Refactor code to fix some imperative code.
* Add friend/contact request functionality.
* Offline functionality

# Prerequisite
This application make use of Google Firebase for the backend. Before running through the steps below you will need to ensure you already have a project with Google Firebase.

https://firebase.google.com/

Firebase CLI via npm : npm install -g firebase-tools

# Initialize your project
0. Edit .firebaserc in the root directory to use your Google Firebase projectId
1. Update the firebaseConfig.js file within the src directory with your Google Firebase config
2. run the deploy script from the functions folder : npm run deploy

# Steps to run
0. Install dependencies via npm : npm install
1. Run application : npm start

# Steps to build
0. Build application : npm run build

# Host application
firebase deploy - Deploy application and functions

# Notes

0. If any changes are made to your cloud functions you will need to run the build script in the functions folder and then deploy. You are able to test locally so please review Google Firebase documentation.
1. firebase deploy will also upload your build folder to host your application. Please ensure you run a build before.
