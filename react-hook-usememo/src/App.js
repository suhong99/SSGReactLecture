import { useMemo, useState } from "react";

/*
  useMemo  : 업데이트가 피룡없는 component까지 rerendering의 경우
      이를 방지하기 위해서 사용하는 것이 useMemo
*/

const square = (params) => {
  console.log("square 함수 실행");
  return params * params;
};

function App() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const countResultA = () => [setCountA(countA + 1)];
  const countResultB = () => [setCountB(countB + 1)];

  const countSum = useMemo(() => square(countB), [countB]);
  // const countSum = square(countB);

  return (
    <div>
      <p>계산 결과A : {countA}</p>
      <button onClick={countResultA}>A+1</button>
      <p>계산 결과B : {countB}</p>
      <button onClick={countResultB}>B+1</button>
      <p>
        {countA} x {countB}= {countA * countB}
      </p>
      <p>
        {countB}^2= {countSum}
      </p>
    </div>
  );
}

export default App;
