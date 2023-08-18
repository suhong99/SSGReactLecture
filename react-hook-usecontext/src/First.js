import Second from "./Second";
import { createContext } from "react";
import { useState } from "react";
export const TextContext = createContext();

const First = () => {
  const [message, setMessage] = useState("안녕하세요 반갑습니다");
  return (
    <div>
      <h2>First Component</h2>
      <TextContext.Provider value={message} action={setMessage}>
        <Second />
      </TextContext.Provider>
    </div>
  );
};

export default First;
