import { useState } from "react";

// function App() {
//   // useState == getter, setter
//   const [state, setState] = useState("클릭");
//   /*
//     변수 :  변수명 -> state
//   */
//   // setState("click");
//   console.log(state);
//   const onClickChanger = () => {
//     state === "클릭" ? setState("클릭됨") : setState("클릭");
//   };
//   return (
//     <div>
//       <button onClick={() => onClickChanger()}>{state}</button>
//       <button onClick={onClickChanger}>{state}2</button>
//     </div>
//   );
// }
//export default App;

// const INITIAL_COUNT = 0;

// const App = () => {
//   const [message, setMessage] = useState(INITIAL_COUNT);
//   const [number, setNumber] = useState(INITIAL_COUNT);
//   // const [arr, setArr] = useState([]);
//   const btnclick = () => {
//     alert(message);
//   };
//   const counter = () => {
//     setNumber(number + 1);
//   };

//   const initcount = () => {
//     setNumber(INITIAL_COUNT);
//   };
//   return (
//     <div>
//       <input
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />
//       <button onClick={() => btnclick()}>message 보기</button>
//       <div>{message}</div>
//       <div>{number}</div>

//       <button onClick={counter}>숫자증가</button>
//       <button onClick={initcount}>초기화</button>
//     </div>
//   );
// };
// export default App;

//////

// function App() {
//   const [inputText, setInputText] = useState("초기값");
//   const [text, setText] = useState("react");
//   const handleChage = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleClick = (e) => {
//     setText(inputText);
//     setInputText("");
//   };
//   return (
//     <>
//       <h1>i love {text}</h1>
//       <input type="text" value={inputText} onChange={handleChage}></input>
//       <input type="button" value="입력" onClick={() => handleClick()} />
//     </>
//   );
// }

//export default App;

///// select

// function App() {
//   const [selectVal, setSelectVal] = useState("Html");

//   function selectChange(e) {
//     setSelectVal(e.target.value);
//   }

//   const selectChoice = () => {
//     alert(selectVal);
//   };
//   return (
//     <div>
//       <p>
//         현재 선택된 항목 : <b>{selectVal}</b>
//       </p>
//       <select value={selectVal} onChange={selectChange}>
//         <option value="Html">Html</option>
//         <option value="Css">Css</option>
//         <option value="React">React</option>
//       </select>

//       <button onClick={() => selectChoice()}>선택된 항목</button>
//     </div>
//   );
// }

// export default App;

// // radio

// const InputRadio = () => {
//   const [radioVal, setRadioVal] = useState("red");

//   const radioChange = (e) => {
//     setRadioVal(e.target.value);
//   };

//   return (
//     <>
//       <p>선택된 항목 {radioVal}</p>
//       <input
//         type="radio"
//         onChange={radioChange}
//         value="red"
//         checked={radioVal === "red"}
//       />
//       red
//       <input
//         type="radio"
//         value="green"
//         onChange={radioChange}
//         checked={radioVal === "green"}
//       />
//       green
//       <input
//         type="radio"
//         value="blue"
//         onChange={radioChange}
//         checked={radioVal === "blue"}
//       />
//       blue
//     </>
//   );
// };

const InputCheck = () => {
  const [id, setId] = useState("");
  const [savedId, setSavedId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const onChangeId = (e) => {
    setId(e.target.value);
    if (isChecked) {
      setSavedId(e.target.value);
    }
  };

  const onCheckId = (e) => {
    alert(savedId);
  };

  const onToggleChecker = () => {
    return isChecked
      ? setIsChecked(false)
      : (setIsChecked(true), setSavedId(id));
  };
  return (
    <div>
      <input type="text" onChange={onChangeId} value={id}></input>
      <input type="checkbox" onClick={onToggleChecker} checked={isChecked} />
      id저장
      <button onClick={onCheckId}>확인</button>
    </div>
  );
};
const App = () => {
  return (
    <div>
      <InputCheck />
      {/* <InputRadio /> */}
    </div>
  );
};

export default App;
