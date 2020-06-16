import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { addPoint } from "../redux/actions";
export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [authorName, setAuthorName] = useState("");
  const [authorTel, setTel] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [terrain, setTerrain] = useState("");
  const [location, setLocation] = useState("");
  const [img, setImg] = useState("");
  const [birthday, setBirthday] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [health, setHealth] = useState("");
  const [clothes, setClothes] = useState("");
  const [stuff, setStuff] = useState("");
  const [more, setMore] = useState("");
  const [specificMarks, setSpecificMarks] = useState("");

  const [searchQuery, SetSearchQuery] = useState("");

  const handleInput = (event) => {
    SetSearchQuery(event.target.value);
  };

  const submitHandler = async (e) => {
    console.log("123");
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await (
        await fetch("/upload", {
          method: "POST",
          body: formData,
        })
      ).json();

      const result = await (
        await fetch("/upload/missedperson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorName: authorName,
            authorTel: authorTel,
            name: name,
            terrain: terrain,
            location: location,
            gender: gender,
            img: res.filePath,
            birthday: birthday,
            description: description,
            health: health,
            clothes: clothes,
            stuff: stuff,
            more: more,
            specificMarks: specificMarks,
            time,
            author: localStorage.getItem("userId"),
          }),
        })
      ).json();
      dispatch(addPoint(searchQuery));
      // if (result.ok === "ok") {
      //   history.goBack();
      // }
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
    >
      <p>Заявитель: ФИО, степень родства (обязательно)</p>
      <input
        type="text"
        name="authorName"
        onChange={(e) => setAuthorName(e.target.value)}
      />
      <p>Контакты заявителя: телефон для связи (обязательно):</p>
      <input
        type="text"
        name="authorPhone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        onChange={(e) => setTel(e.target.value)}
      />
      <p>ФИО пропавшего (обязательно):</p>
      <input
        type="text"
        placeholder="ФИО"
        name="nameMissed"
        onChange={(e) => setName(e.target.value)}
      />
      <p>Пол пропавшего:</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <span>
          <label htmlFor="choiceMale">Мужской</label>
          <input
            type="radio"
            name="sex"
            value="мужской"
            id="choiceMale"
            onClick={() => setGender("Male")}
          />
        </span>
        <span>
          <label htmlFor="choiceMale">Женский</label>
          <input
            type="radio"
            name="sex"
            value="женский"
            id="choiceFemale"
            onClick={() => setGender("Female")}
          />
        </span>
      </div>
      <p>Дата рождения:</p>
      <input
        type="date"
        name="birthday"
        onChange={(e) => setBirthday(e.target.value)}
      ></input>
      <p>Адрес пропажи</p>
      <input type="text" name="inputСoordinates" onChange={handleInput} />
      <p>Местность пропажи</p>
      <input
        type="text"
        name="terrain"
        onChange={(e) => setTerrain(e.target.value)}
      ></input>
      <p>Время пропажи</p>
      <input
        type="text"
        name="time"
        onChange={(e) => setTime(e.target.value)}
      ></input>
      <p>Обстоятельства пропажи:</p>
      <textarea
        name="descripton"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <p>Состояние здоровья пропавшего</p>
      <input
        type="text"
        name="health"
        onChange={(e) => setHealth(e.target.value)}
      ></input>
      <p>Во что одет пропавший:</p>
      <input
        type="text"
        name="clothes"
        onChange={(e) => setClothes(e.target.value)}
      ></input>
      <p>Особые приметы:</p>
      <input
        type="text"
        name="specificMarks"
        onChange={(e) => setSpecificMarks(e.target.value)}
      />
      <p>Что у пропавшего было с собой:</p>
      <input
        type="text"
        name="stuff"
        onChange={(e) => setStuff(e.target.value)}
      />
      <p> Фотография пропавшего </p>
      <input
        type="file"
        onChange={(e) => {
          e.preventDefault();
          setImg(e.target.files[0]);
        }}
      />
      <p>Дополнительная информация</p>
      <input
        type="text"
        name="more"
        onChange={(e) => setMore(e.target.value)}
      />
      <p></p>

      <Button
        variant="contained"
        color="primary"
        onClick={(e) => submitHandler(e)}
      >
        Создать
      </Button>
    </div>
  );
};
