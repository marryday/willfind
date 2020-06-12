const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  role: { type: String, required: true, default: 'user' },
  image: { type: String, default: 'http://localhost:3000/no-photo.jpg' },
  points: { 
    type: Number, defaultt: 0
  },
});
const User = mongoose.model('User', userSchema);

module.exports = { User };
