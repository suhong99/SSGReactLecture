import React from "react";

const Download = () => {
  const download = async () => {
    let fileName = "캡처.png";
    // let fileName = "image.png";

    const url = "http://localhost:3000/fileDownload?filename=" + fileName;

    // a tag 생성한 후에 다운로드
    /*
    const download = document.createElement("a");
    download.setAttribute("href", url);
    download.setAttribute("download", fileName);
    download.setAttribute("type", "application/json");
    download.click();
    */

    window.location.href = url;
  };
  return (
    <div>
      <h3>file download</h3>
      <button onClick={download}>file download</button>
    </div>
  );
};

export default Download;
