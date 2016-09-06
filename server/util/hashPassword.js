const bcrypt = require('bcrypt-nodejs');

const hashPassword = function(password, cb) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
};

module.exports = hashPassword;