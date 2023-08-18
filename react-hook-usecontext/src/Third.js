import { useContext } from "react";
import { TextContext } from "./First";

const Third = () => {
  const msg = useContext(TextContext);
  return (
    <div style={{ backgroundColor: "red" }}>
      <h4>Third Component</h4>
      <input onChange={(e) => e} value={{ msg }}></input>
    </div>
  );
};

export default Third;
