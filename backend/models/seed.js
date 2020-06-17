const mongoose = require('mongoose');
const User = require('./userSchema');
const Poteryash = require('./poteryashSchema');

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

    const alex = new User({
      firstName: 'Александр',
      lastName: 'Овчинников',
      login: 'alex2',
      email: 'alex@gmail.com',
      password: '123',
      createdAt: `${Date.now()}`,
      image: 'https://avatars2.githubusercontent.com/u/17834588?s=460&u=0e0fdde5adf56bce818eaf86d9692ba8c626e70f&v=4',
      locationX: '55.708947',
      locationY: '37.593093',
    });
    await alex.save();

    const dima = new Poteryash({
      firstName: 'Дима',
      lastName: 'Иванов',
      middleName: 'Хренович',
      sex: 'Мужской',
      birthDate: '10.04.1987',
      addressOfLost: 'Москва, Вавилова ул, д, 4',
      timeOfLost: '11.06.2020',
      aboutOfLost: 'Пошел в школу Эльбрус и пропал',
      health: 'Хорошее',
      clothes: 'Красные макасины, синие джинсы, розовая кофточка',
      specialSigns: 'Нос крючком, зубы торчком',
      thingsWith: 'Ноутбук с Ubuntu',
      image: 'https://files.adme.ru/files/news/part_165/1658265/8881915-41015510-3-0-1514194738-1514194747-1500-1-1514194747-650-bf931488f4-1514279441.jpg',
      description: 'В последние три месяца часто не появлялся дома, говорил про боязнь повтора фазы и сложность финального проекта.',
      createdAt: `${Date.now()}`,
    });
    await dima.save();

    const vasya = new Poteryash({
      firstName: 'Василий',
      lastName: 'Голубкин',
      middleName: 'Петрович',
      sex: 'Мужской',
      birthDate: '10.02.1982',
      addressOfLost: 'Москва, Вавилова ул, д, 16',
      timeOfLost: '13.06.2020',
      aboutOfLost: 'Ушел из дома и не вернулся',
      health: 'Отличное',
      clothes: 'Зеленые сандали, белые носки, желтые шортв, майка-алкашка',
      specialSigns: 'Пивное пузо',
      thingsWith: 'Ubuntu без ноутбука',
      image: 'https://cdnimg.rg.ru/img/content/177/27/59/poslednij_uzhin_Etci_d_850_d_850.jpg',
      description: 'Гулял по дворам и не вернулся.',
      createdAt: `${Date.now()}`,
    });
    await vasya.save();

    const petya = new Poteryash({
      firstName: 'Петр',
      lastName: 'Пупкин',
      middleName: 'Васильевич',
      sex: 'Мужской',
      birthDate: '12.11.1988',
      addressOfLost: 'Москва, Вавилова ул, д, 10',
      timeOfLost: '15.06.2020',
      aboutOfLost: 'Ушел из дома',
      health: 'Удовлетворительное',
      clothes: 'белые носки, желтые труселя',
      specialSigns: 'Отсутствуют',
      thingsWith: 'Банка ягуара',
      image: 'https://files.adme.ru/files/news/part_165/1658265/8881565-8-0-1514194890-1514194898-650-fd8a7b9d44-1514279441.jpg',
      description: 'Просто взял и ушел.',
      createdAt: `${Date.now()}`,
    });
     await petya.save();

    const mark = new Poteryash({
      firstName: 'Марк',
      lastName: 'Захарян',
      middleName: 'Магомедович',
      sex: 'Мужской',
      birthDate: '12.03.1969',
      addressOfLost: 'Москва, Вавилова ул, д, 9',
      timeOfLost: '12.05.2020',
      aboutOfLost: 'Вышел в магазин',
      health: 'Удовлетворительное',
      clothes: 'Костюм трикотаждый',
      specialSigns: 'Татуировка с Путиным на печени',
      thingsWith: 'Конституция РФ',
      image: 'https://lh3.googleusercontent.com/proxy/Qs7Y9bc3HIzvc7yKMuDKvzM0RennJ_P_cqGfUJr7MFb8YnejZAe-dMAN1gglGSWJHiA2ZX2EdMMs9axVF62qcmaKXPR2hq0dURV1oQogjA',
      description: 'ушел и не вернулся',
      createdAt: `${Date.now()}`,
    });
    await mark.save();

    const roman = new Poteryash({
      firstName: 'Роман',
      lastName: 'Охламонов',
      middleName: 'Ольгович',
      sex: 'Мужской',
      birthDate: '22.09.1972',
      addressOfLost: 'Москва, Вавилова ул, д, 2',
      timeOfLost: '15.06.2020',
      aboutOfLost: 'Вышел в магазин',
      health: 'Отличное',
      clothes: 'Костюм адидас в полоску',
      specialSigns: 'Немного полноват',
      thingsWith: 'Два бигмака, картошка фри и сырный соус',
      image: 'https://dislife.ru/upload/userfiles/2010_12_07/8b77cca0c19152e02aba91e8ee27e5c4.jpg',
      description: 'ушел и не вернулся',
      createdAt: `${Date.now()}`,
    });
    await roman.save();

}
seed()
.then(() => {
  mongoose.disconnect();
});