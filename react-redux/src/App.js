import store from "./store/index";
import { useSelector } from "react-redux";
import Counter from "./Counter";
import Card from "./Card";
function App() {
  const count = useSelector((state) => state.count);
  return (
    <div>
      <h1>App</h1>
      <p>count : {store.getState().count}</p>
      <p>count : {count}</p>

      <Counter />
      <Card />
    </div>
  );
}

export default App;
