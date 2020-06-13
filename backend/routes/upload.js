const router = require("express").Router();
const path = require('path');

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


router.post('/url', async(req, res) => {
  console.log(req.body)
  // const testFolder = path.join(__dirname, `../../public/uploads/${file.name}`);
})
module.exports = router;