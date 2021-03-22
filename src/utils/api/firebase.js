import firebase from 'firebase'

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_AURL,
    projectId: process.env.REACT_APP_ID,
    storageBucket: process.env.REACT_APP_BUCKET,
    messagingSenderId: process.env.REACT_APP_MSG,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(config)

export default firebase;
//export const provider = new firebase.auth.GoogleAuthProvider();
//export const auth = firebase.auth();
