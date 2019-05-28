const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebookID: String
})

mongoose.model('users', userSchema);