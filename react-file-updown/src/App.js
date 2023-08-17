import { useState } from "react";

import axios from "axios";
import Download from "./Download";
function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(); // 이동을 하지 않도록 설정하는 함수
    //  alert("onSubmit");

    // formfield + file -> 짐을 싼다
    let formData = new FormData();
    formData.append("number", number);
    formData.append("name", name);
    formData.append("address", address);

    formData.append("uploadFile", document.frm.uploadFile.files[0]);

    // 보내자!
    axios
      .post("http://localhost:3000/fileupload", formData)
      .then((resp) => {
        console.log(resp.data);
        alert("파일업로드 성공!");
      })
      .catch((err) => {
        alert("파일업로드 실패~");
      });
  };

  return (
    <div>
      <h3>file upload</h3>
      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <input
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          placeholder="number"
        />
        <br />
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="name"
        />
        <br />
        <input
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="address"
        />
        <br />
        <input type="file" name="uploadFile" />
        <br />
        <input type="submit" value="file upload" />
      </form>

      <hr />
      <Download />
    </div>
  );
}

export default App;
