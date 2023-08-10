import { useSelector } from "react-redux";

function Card() {
  const { name, count } = useSelector((state) => state);

  return (
    <div>
      <h1>Card Component</h1>
      <p>name : {name}</p>
      <p>Count : {count}</p>
    </div>
  );
}
export default Card;
