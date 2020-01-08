const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  // .... attributes here
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function saveHook(next) {
  let user = this;
  // Generate a password hash when the password changes (or a new password)
  if (!user.isModified('password')) return next();
  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // Combining Salt to Generate New Hash
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      // Overwriting plaintext passwords with hash
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
module.exports = mongoose.model('User', UserSchema);
