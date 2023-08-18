import React, { useState } from "react";

//TTS 플러그인 사용하지 않음
const App = () => {
  const [text, setText] = useState("");
  const pitch = 1; // 음의 높낮이
  const rate = 1; // 속도

  // 음성 목록 채우기
  const populateVoiceList = (synth) => {
    try {
      const voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase();
        const bname = b.name.toUpperCase();

        if (aname < bname) return -1;
        else if (aname === bname) return 0;
        else return +1;
      });
      return voices;
    } catch (error) {
      throw new Error("Fail");
    }
  };
  // speech 함수

  const speak = (textToRead, synth) => {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => populateVoiceList;
    }

    if (synth.speaking) {
      console.error("speechSynthesis speaking");
      return;
    }

    // speech
    if (textToRead !== "") {
      const utterThis = new SpeechSynthesisUtterance(textToRead);
      utterThis.onload = function (event) {};

      utterThis.onerror = function (event) {};

      utterThis.pitch = pitch;
      utterThis.rate = rate;

      synth.speak(utterThis); // 실제 음성 실행
    }
  };
  // 실행버튼
  const voiceRun = () => {
    speechSynthesis.cancel();

    speak(text, window.speechSynthesis);
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => voiceRun()}>듣기</button>
    </div>
  );
};

export default App;
