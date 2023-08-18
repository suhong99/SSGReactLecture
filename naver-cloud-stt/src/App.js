import React, { useState } from "react";
import axios from "axios";
import { ReactMediaRecorder } from "react-media-recorder";
// npm i react-media-recorder@1.6.5 // 상위 버전 에러있음
const App = () => {
  const [resp, setResp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("uploadFile", document.frm.uploadFile.files[0]);
    console.log(setIsLoading);
    setIsLoading(true);
    //send
    axios
      .post("http://localhost:3000/fileUploadSTT", formData)
      .then((resp) => {
        setResp(resp.data.text);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        alert("error");
      });
  };
  return (
    <div>
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <br />
            <br />
            <audio src={mediaBlobUrl} controls></audio>
            <br />

            {/* 다운로드 링크 */}
            <a href={mediaBlobUrl} download="my-audio-file.wav">
              download
            </a>
          </div>
        )}
      ></ReactMediaRecorder>

      <hr />
      <h2>음성파일 upload</h2>
      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" name="uploadFile" accept="*" />

        {!isLoading && <input type="submit" value="파일전송" />}
      </form>

      <p>결과 : {resp}</p>
    </div>
  );
};

export default App;
