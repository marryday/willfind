const mongoose = require('mongoose');

const poteryashSchema = new mongoose.Schema({
  firstName: { type: String },
  authorName: { type: String },
  authorTel: { type: String },
  lastName: { type: String },
  middleName: { type: String },
  sex: { type: String },
  more: { type: String },
  terrain: { type: String },
  specificMarks: { type: String },
  birthDate: { type: String },
  addressOfLost: { type: String },
  timeOfLost: { type: String },
  aboutOfLost: { type: String },
  health: { type: String },
  clothes: { type: String },
  specialSigns: { type: String },
  thingsWith: { type: String },
  image: { type: String, default: 'http://localhost:3000/no-photo.jpg' },
  description: { type: String },
  createdAt: { type: Date, required: true },
  foundAt: { type: Date },
  foundLocationX: { type: String },
  foundLocationY: { type: String },
  coordinates: [{ type: String }],
  ages: { type: String },
  author: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Poteryash', poteryashSchema);
