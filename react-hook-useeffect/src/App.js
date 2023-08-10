import { useEffect, useState } from "react";

/*
 useeffect : 컴퍼넌트가 렌더링 될 때, 특정 작업을 실행하는 것
 무한루프에 빠질 수도 있어서 유의해야한다.
*/

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const counter = () => {
    setCount(count + 1);
  };

  const numberCounter = () => {
    setNumber(number + 1);
  };

  // 랜더링이 될 때 마다 발생하는 코드
  // useEffect(function () {
  //   console.log("useEffect", count);
  // });

  // //처음 랜더링할 때만
  // useEffect(function () {
  //   console.log("useEffect", count);
  // }, []);

  // 특정 변수만 실행
  useEffect(
    function () {
      console.log("useEffect", count);
    },
    [count, number]
  );
  return (
    <div>
      <p>카운터 : {count}</p>
      <button onClick={() => counter()}>counter</button>
      <button onClick={() => numberCounter()}>numberCounter</button>

      <button
        onClick={() => {
          console.log("클릭");
        }}
      >
        click
      </button>
    </div>
  );
}

export default App;
