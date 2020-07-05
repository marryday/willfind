const router = require("express").Router();
const path = require("path");
const Poteryash = require("../models/poteryashSchema");
const User = require("../models/userSchema");

const fs = require("fs");

router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" });
  }
  const file = req.files.file;
  file.mv(path.join(__dirname, `../../public/uploads/${file.name}`), (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
const getAges = (year) => {
  if (year) return new Date().getFullYear() - Number(year);
};

router.post("/missedperson", async (req, res) => {
  try {
    const fio = req.body.name.split(" ");
    const firstName = fio[1];
    const middleName = fio[2];
    const lastName = fio[0];
    const ages = getAges(String(req.body.birthday).slice(0, 4));
    const author = await User.findById(req.body.author);
    const poteryash = await new Poteryash({
      authorName: req.body.authorName,
      authorTel: req.body.authorTel,
      firstName,
      lastName,
      middleName,
      specificMarks: req.body.specificMarks,
      terrain: req.body.terrain,
      sex: req.body.gender,
      more: req.body.more,
      birthDate: req.body.birthday,
      addressOfLost: req.body.addressOfLost,
      timeOfLost: req.body.time,
      aboutOfLost: req.body.description,
      health: req.body.health,
      clothes: req.body.clothes,
      SpecialSigns: req.body.specificMarks,
      thingsWith: req.body.stuff,
      image: req.body.img,
      createdAt: new Date(),
      ages,
      author,
    });
    await poteryash.save();
    author.searching.push(poteryash);
    await author.save();
    res.json(poteryash);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/missedpersonOne", async (req, res) => {
  const user = await Poteryash.findById(req.body.id);
  res.json(user);
});

router.get("/missedpeople", async (req, res) => {
  try {
    let ppl = await Poteryash.find();
    res.json({ ppl });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.patch("/coordinates", async (req, res) => {
  try {
    const poteryash = await Poteryash.findById(req.body.id);
    poteryash.coordinates = req.body.coordinates;
    await poteryash.save();
    res.json(poteryash);
  } catch (e) {
    res.json(e);
  }
});

router.get("/countcoordinates/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    const userCoordinates = [
      Number(user.coordinates[0]),
      Number(user.coordinates[1]),
    ];

    const sumUserCoordinates = userCoordinates[0] + userCoordinates[1];
    let poteryashes = await Poteryash.find();
    poteryashes.forEach(p => p.sumCoordinates = Number(p.coordinates[0]) + Number(p.coordinates[1]))

  
    const func2 = (number, arr) => {
      return arr.filter(item => (item - number) <= 0.1)
  }

  
    const coordinates = poteryashes.map(
      (p) => Number(p.coordinates[0]) + Number(p.coordinates[1])
    );
    const result = coordinates.filter((el) => Math.abs(el - sumUserCoordinates < 0.1));
    
      const nashel = poteryashes.filter(p => p.sumCoordinates === result[0])
    
    res.json(nashel)
  } catch (e) {
    res.json(e);
  }
});
module.exports = router;