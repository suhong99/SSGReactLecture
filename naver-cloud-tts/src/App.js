import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [resp, setResp] = useState("");
  const [text, setText] = useState("");
  // console.log(type + "type");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    //send
    axios
      .post("http://localhost:3000/tts?speech=" + text)
      .then((resp) => {
        setResp(resp.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        alert("error");
      });
  };

  return (
    <div>
      <h1>Text To Speech Sample</h1>
      <br />
      <form onSubmit={onSubmit}>
        {/* <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="celebrity">유명인 인식</option>
          <option value="face">얼굴 평가</option>
        </select> */}
        <input
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        {!isLoading && <input type="submit" value="변환하기" />}
      </form>
      <p>결과 : {resp}</p>
    </div>
  );
};

export default App;
