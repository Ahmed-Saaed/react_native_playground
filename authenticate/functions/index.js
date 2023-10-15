const functions = require('firebase-functions');
const createUser = require('./create_user');
const admin = require('firebase-admin');
const ServiceAccount = require('./service_account.json');
const requestOneTimePassword = require('./request_one_time_password');
const verifyOneTimePassword = require('./verify_one_time_password');

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: 'https://one-time-password-22711.firebaseio.com', // this will be your link after this S#$@ works.
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword
);

exports.verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePassword
);
