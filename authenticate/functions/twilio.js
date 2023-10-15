const twilio = require('twilio');

const accountSid = 'AC2fed4042c1c2779f6372976465ca16e7';
const authToken = 'daf5a4d5c98c67876886456228e9d488';

module.expors = new twilio.Twilio(accountSid, authToken);
