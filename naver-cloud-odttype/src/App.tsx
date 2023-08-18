import React, { useState } from "react";
import axios from "axios";

interface Prediction {
  num_detections: number;
  detection_names: string[];
  // [key: string]: any;
}

interface ResponseData {
  predictions: Prediction[];
  // [key: string]: any;
}
const App: React.FC = () => {
  const [resp, setResp] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    const uploadFileInput = document.forms.namedItem("frm")?.uploadFile;
    if (uploadFileInput.files.length > 0) {
      formData.append("uploadFile", uploadFileInput.files[0]);

      setIsLoading(true);

      axios
        .post<ResponseData>("http://localhost:3000/fileODT", formData)
        .then(({ data }) => {
          setCount(data.predictions[0].num_detections);
          setResp(data.predictions[0].detection_names);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          alert("error");
        });
    }
  };

  return (
    <div>
      <h2>이미지 파일 업로드</h2>
      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" name="uploadFile" accept="image/*" />
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
