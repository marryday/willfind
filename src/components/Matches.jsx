import React, { useEffect, useState } from "react";

export default () => {
  const [poteryash, setPoteryash] = useState("");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`upload/countcoordinates/${id}`, { method: "GET" }).then((r) =>
      r.json().then((data) => {
        console.log(data[0]);
        setPoteryash(data[0]);
      })
    );
  }, []);

  return (
    <div>
      <p>
        Не далеко от вас пропал {poteryash.firstName} {poteryash.lastName}! В
        последний раз замечен на {poteryash.addressOfLost}
      </p>
      <img src={poteryash.image}></img>
    </div>
  );
};
