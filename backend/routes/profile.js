const router = require("express").Router();
const { User } = require("../models/userSchema");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");

// Загрузка фото профиля
router.post("/upload", async function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let sampleFile = req.files.sampleFile;
  let fileName = sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(
    __dirname.replace("routes", "") + "public/uploads/profile/" + fileName,
    async function (err) {
      if (err) return res.status(500).send(err);

      let user = await User.findOne({ login: req.session.user.login });
      user.image = "http://localhost:3000/uploads/profile/" + `${fileName}`;
      await user.save();
      req.session.user = {
        login: user.login,
        email: user.email,
        role: user.role,
        id: user.id,
        image: user.image,
      };
      res.redirect("edit");
    }
  );
});

//############################################# РЕДАКТИРОВАНИЕ ПРОФИЛЯ ##########
//GET: Редактирование профиля
router.get("/edit", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/profile");
  } else {
    let userSession = req.session.user;
    let user = await User.findOne({ login: req.session.user.login });
    res.render("profile/profile", {
      login: req.session.user.login,
      email: req.session.user.email,
      image: user.image,
      userSession,
    });
  }
});

//POST: Редактирование профиля
router.post("/edit", async (req, res) => {
  const userSession = req.session.user;
  const { login, email } = req.body;
  // console.log("login: " + login, "password: " + password);
  const findLogin = await User.findOne({ login: login });
  const findEmail = await User.findOne({ email: email });
  // console.log(findLogin._id, req.session.user.id);
  // console.log(findLogin._id,  req.session.user.id);

  if (findLogin && findEmail) {
    if (
      findLogin._id != req.session.user.id &&
      findEmail._id != req.session.user.id
    ) {
      res.locals.registerError = { message: "Login  и Email уже существуют" };
      return res.render("profile/profile", { userSession });
    }
  }
  if (findLogin) {
    if (findLogin._id != req.session.user.id) {
      res.locals.registerError = { message: "Login уже существует" };
      return res.render("profile/profile", { userSession });
    }
  }
  if (findEmail) {
    if (findEmail._id != req.session.user.id) {
      res.locals.registerError = { message: "Email уже существует" };
      return res.render("profile/profile", { userSession });
    }
  }
  await User.findOneAndUpdate(
    { _id: req.session.user.id },
    { login: req.body.login, email: req.body.email }
  );
  const findUser = await User.findById(userSession.id);
  req.session.user = {
    login: req.body.login,
    email: req.body.email,
    role: findUser.role,
    id: findUser.id,
    image: findUser.image,
  };
  return res.redirect("/profile/edit");
});

//POST: Авторизация пользователя
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const temp = await bcrypt.compare(password, user.password)
  if (user && temp) {
    req.session.user = {
      login: user.login,
      email: user.email,
      role: user.role,
      id: user._id,
      image: user.image,
    };
    const userSession = req.session.user;
    res.json({ status: true, userSession });
  } else {
    res.json({ status: false, message: "Неверно указан логин или пароль" });
  }
});

//POST: Регистрация пользователя
router.post("/signup", async (req, res) => {
  const { login, email, password } = req.body;
  const findLogin = await User.findOne({ login: login });
  const findEmail = await User.findOne({ email: email });

  if (findLogin || findEmail) {
    let booleanLogin = findLogin ? true : false;
    let booleanEmail = findEmail ? true : false;

    if (booleanLogin && booleanEmail) {
      res.locals.registerError = { message: "Login  и Email уже существуют" };
      res.render("profile/register");
    } else if (booleanLogin) {
      res.locals.registerError = { message: "Login уже существует" };
      res.render("profile/register");
    } else {
      res.locals.registerError = { message: "Email уже существует" };
      res.render("profile/register");
    }
  } else {
    const newUser = new User({
      login,
      email,
      password: await bcrypt.hash(password, 10),
      createdAt: Date.now(),
    });
    await newUser.save();
    res.locals.session = true;
    req.session.user = {
      login: newUser.login,
      email: newUser.email,
      role: newUser.role,
      id: newUser._id,
      image: newUser.image,
    };
    const userSession = req.session.user;
    res.json({ status: true, userSession });
  }
});

router.post("/session", (req, res) => {
  if (req.session.user) {
    const userSession = req.session.user;
    return res.json({ status: true, userSession });
  } else {
    return res.json({ status: false });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ status: true, message: "До встречи!" });
});

module.exports = router;
