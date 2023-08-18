import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [resp, setResp] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("uploadFile", document.frm.uploadFile.files[0]);
    setIsLoading(true);
    //send
    axios
      .post("http://localhost:3000/fileODT", formData)
      .then((resp) => {
        console.log(resp.data.predictions[0]);
        setCount(resp.data.predictions[0].num_detections);
        setResp(resp.data.predictions[0].detection_names);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        alert("error");
      });
  };
  return (
    <div>
      <h2>이미지 파일 업로드</h2>
      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" name="uploadFile" accept="*" />

        {!isLoading && <input type="submit" value="파일전송" />}
      </form>

      <p>결과: {count}</p>
      <ul>
        {resp.map((object, i) => (
          <li key={i}>{object}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
