import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [resp, setResp] = useState("");
  const [type, setType] = useState("celebrity");

  // console.log(type + "type");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("type", type);
    formData.append("uploadFile", document.frm.uploadFile.files[0]);
    setIsLoading(true);
    //send
    axios
      .post("http://localhost:3000/fileUploadCFR", formData)
      .then((resp) => {
        console.log(resp.data.faces[0].age);
        type === "celebrity"
          ? setResp(JSON.stringify(resp.data.faces))
          : setResp(
              "age: " +
                resp.data.faces[0].age.value +
                " emotion : " +
                resp.data.faces[0].emotion.value +
                " gender : " +
                resp.data.faces[0].gender.value +
                " pose : " +
                resp.data.faces[0].pose.value
            );
        // setResp(resp.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        alert("error");
      });
  };

  return (
    <div>
      <h1>CFR 테스트</h1>
      <br />
      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="celebrity">유명인 인식</option>
          <option value="face">얼굴 평가</option>
        </select>
        <input type="file" name="uploadFile" accept="*" />
        {!isLoading && <input type="submit" value="파일전송" />}
      </form>
      <p>결과 : {resp}</p>
    </div>
  );
};

export default App;
