import { useState, useContext, createContext } from "react";
import FirstComp from "./FirstsComp";
import First from "./First";
/*
  usecontext : 전역변수의 역할
  A Comp
  B Comp
  C Comp
*/

// // useContext를 사용하지 않은 경우

// function App() {
//   const [name, setName] = useState("전달하고 싶은 값");
//   return (
//     <div>
//       <FirstComp name={name} />
//     </div>
//   );
// }

// export default App;

//
// const SampleContextObj = createContext();

// const UserComponent = () => {
//   const msg = useContext(SampleContextObj);
//   return (
//     <div>
//       <h3>전달된 메시지 : {msg}</h3>
//     </div>
//   );
// };

// const App = () => {
//   const message = "I love react";
//   return (
//     <SampleContextObj.Provider value={message}>
//       <UserComponent />
//     </SampleContextObj.Provider>
//   );
// };

// export default App;

// 컴퍼넌트 분리까지
//First -> Third까지 전달
const App = () => {
  return (
    <div>
      <First />
    </div>
  );
};

export default App;
