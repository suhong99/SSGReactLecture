import Post from "./Post";
import { useState } from "react";
function App() {
  const [enroll_company, setEnroll_company] = useState({ address: "" });
  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data) => {
    setPopup(!popup);
  };
  return (
    <div>
      address
      <input placeholder="주소" required={true} name="address" onChange={handleInput} value={enroll_company.address} />
      <button onClick={handleComplete}>우편번호 찾기</button>
      {popup && <Post onClose={setPopup} company={enroll_company} setcompany={setEnroll_company} />}
    </div>
  );
}

export default App;
