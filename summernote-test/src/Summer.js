import { useState } from "react";

import Reactsummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "bootstrap/dist/css/bootstrap.css";

import "./Summer.css";

function Summernote() {
  const [snote, setSnote] = useState(""); // 값을 취득
  const [print, setPrint] = useState(""); // detail용
  function onChange(e) {
    console.log(e);
    setSnote(e);
  }

  // 이미지를 업로드
  function onImageUpload(images, insertImage) {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        insertImage(reader.result);
      };
      reader.readAsDataURL(images[i]);
    }
  }

  //
  const btnclick = () => {
    // alert(snote);
    setPrint(snote);
  };
  return (
    <div style={{ padding: 30, width: 1000 }} className="Summer">
      <Reactsummernote
        value={snote}
        options={{
          lang: "ko-KR", // default: 'en-US'
          height: 500,
          dialogsInBody: true,
          focus: true,
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "clear"]],
            ["fontsize", ["fontsize"]],
            ["fontname", ["fontname"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview"]],
          ],
        }}
        onChange={onChange}
        onImageUpload={onImageUpload}
      />

      {/* 출력하기 */}
      <button onClick={btnclick}>내용보기</button>
      <hr />

      {/* 문자열-> reaact형식으로 변환 */}
      <div dangerouslySetInnerHTML={{ __html: print }}></div>
    </div>
  );
}

export default Summernote;
