const router = require("express").Router();
const path = require('path');
const Poteryash = require('../models/poteryashSchema')
const User = require('../models/userSchema')


const fs = require('fs');

router.post('/', (req,res) => {
  if(req.files === null){
    return res.status(400).json({msg: 'No file was uploaded'});
  }
  const file = req.files.file;
  file.mv(path.join(__dirname, `../../public/uploads/${file.name}`), err =>{
    if(err){
      console.error(err)
      return res.status(500).send(err)
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
  })
})

router.post('/missedperson', async (req, res) => {
  console.log(req.body)
  try{
  const fio = req.body.name.split(' ')
  const firstName = fio[0];
  const middleName= fio[1];
  const lastName = fio[2];
  const author = await User.findById(req.body.author)

  const poteryash = await new Poteryash({
    firstName,
    lastName,
    middleName,
    sex: req.body.gender,
    birthDate: req.body.birthday,
    addressOfLost: req.body.location,
    timeOfLost: req.body.time,
    aboutOfLost: req.body.description,
    health: req.body.health,
    clothes: req.body.clothes,
    SpecialSigns: req.body.specificMarks,
    thingsWith: req.body.stuff,
    image: req.body.img,
    createdAt: new Date(),
    author,
  })
  await poteryash.save();
  author.searching.push(poteryash);
  await author.save()
  res.json(poteryash)
}catch(e) {
  console.error(e.message);
  return res.status(500).send(e)
}
})

router.get('/missedpeople' , async (req, res) => {
  try{
  let ppl = await Poteryash.find();
  res.json({ppl})
  }catch(e) {
    res.status(500).json(e)
  }
})

router.patch('/coordinates', async(req, res) => {
  const poteryash = await Poteryash.findById(req.body.id);
  poteryash
})
module.exports = router;


// const poteryashSchema = new mongoose.Schema({
//   firstName: { type: String },
//   lastName: { type: String },
//   middleName: { type: String },
//   sex: { type: String},
//   birthDate: { type: Date },
//   addressOfLost: { type: String },
//   timeOfLost: { type: String },
//   aboutOfLost: { type: String },
//   health: { type: String },
//   clothes: { type: String },
//   specialSigns: { type: String},
//   thingsWith: { type: String},
//   image: { type: String, default: 'http://localhost:3000/no-photo.jpg' },
//   description: { type: String},
//   createdAt: { type: Date, required: true },
//   foundAt: { type: Date},
//   foundLocationX: { type: String },
//   foundLocationY: { type: String },
// });