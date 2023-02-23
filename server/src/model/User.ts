// Need to Stop Cannot redeclare block scoped variable Error
export {};
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reports: [{ type: String }],
  refreshToken: [String],
});

module.exports = mongoose.model('User', userSchema);
