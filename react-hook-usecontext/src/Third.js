import { useContext } from "react";
import { TextContext } from "./First";

const Third = () => {
  const msg = useContext(TextContext);
  return (
    <div>
      <h4>Third Component</h4>
      <p>{msg}</p>
    </div>
  );
};

export default Third;
