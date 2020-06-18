const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: String },
  role: { type: String, required: true, default: 'user' },
  image: { type: String, default: 'http://localhost:3000/no-photo.jpg' },
  locationX: {type: String},
  locationY: {type: String},
  coordinates: [{ type: String }],
  address: {type: String},
  searching: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poteryash',
    },
  ],
});


module.exports = mongoose.model('User', userSchema);
