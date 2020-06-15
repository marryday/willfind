const router = require("express").Router();
const path = require('path');
const Poteryash = require('../models/poteryashSchema')



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
  const firstName = fio[1];
  const lastName = fio[2];
  const middleName = fio[3];

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
    createdAt: new Date()
  })
  await poteryash.save();
  res.json({ok: 'ok'})
}catch(e) {
  console.error(e.message);
  return res.status(500).send(e)
}
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