const admin = require('firebase-admin');
const twilio = require('./twilio');

module.expors = function (req, res) {
  if (!req.body.phone) {
    return res.status(422).send({error: 'you must provide a phone number'});
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin
    .auth()
    .getUser(phone)
    .then((userRecord) => {
      const code = Math.random() * 8999 + 1000;
      twilio.messages.create(
        {
          body: 'your code is ' + code,
          to: phone,
          from: 'my phone number from twilio as string',
        },
        (err) => {
          if (err) {
            return res.status(422).send({error: err});
          }

          admin
            .database()
            .ref('users/' + phone)
            .update({code: code}, () => {
              res.send({success: true});
            });
        }
      );
    })
    .catch((err) => {
      res.status(422).send({error: err});
    });
};
