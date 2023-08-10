import { legacy_createStore as createStore } from "redux";

///////////// reducer 생성

const initialState = {
  count: 343,
  name: "홍길동",
};

const reducer = (state = initialState) => {
  return state;
};

///////////////////

// 데이터 저장 위치 Store 생성
const store = createStore(reducer);

export default store;
