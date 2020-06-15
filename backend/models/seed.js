const mongoose = require('mongoose');
const User = require('./userSchema');

mongoose.connect('mongodb+srv://user:elbrusBoot@cluster0-fgdpm.mongodb.net/willFind?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

async function seed() {
  const juriy = new User({
    firstName: 'Юрий',
    lastName: 'Евсеев',
    login: 'marryday',
    email: 'marryday@gmail.com',
    password: '123',
    createdAt: `${Date.now()}`,
    image: 'https://avatars0.githubusercontent.com/u/57489315?s=460&u=14f57acbf998218d702ac896898dffd2365624db&v=4',
    locationX: '55.708927',
    locationY: '37.593093',
  });
  await juriy.save();
}

seed()
.then(() => {
  mongoose.disconnect();
})