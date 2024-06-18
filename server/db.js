const {getFirestore} = require('firebase-admin/firestore');

var admin = require("firebase-admin");

var serviceAccount = require("./firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {db};