import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const App = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>이 브라우저는 지원되지 않습니다.</span>;
  }
  return (
    <div>
      <p>Microphone : {listening ? "on" : "off"} </p>
      <button onClick={SpeechRecognition.startListening}>시작</button>
      <button onClick={SpeechRecognition.stopListening}>멈춰!</button>
      <button onClick={resetTranscript}>초기화</button>

      <h3>{transcript}</h3>
    </div>
  );
};

export default App;
