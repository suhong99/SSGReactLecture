import { useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.count);

  return (
    <div>
      <h1>Counter Component</h1>
      <p>count : {count}</p>
    </div>
  );
}
export default Counter;
