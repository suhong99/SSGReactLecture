import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // npm i react-cookie

const centerStyle = {
  margin: "auto",
  width: "400px",
  border: "1px solid #a1a1a1",
  padding: "10px",
  borderRadius: "30px",
};

const Login = () => {
  const navi = useNavigate();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const [cookies, setCookies] = useCookies(""); // 쿠키 저장용
  const [saveId, setSaveId] = useState(false); // 첵크박스용

  // cookie 저장 및 첵크박스
  function checkHandler() {
    // alert(saveId);
    setSaveId(!saveId); // true => false, false => true
    if (!saveId === true && id !== "") {
      setCookies("user_id", id);
    } else {
      setCookies("user_id", "");
    }
  }

  useEffect(
    function () {
      let user_id = cookies.user_id;
      if (user_id !== undefined && user_id !== "") {
        setId(user_id);
        setSaveId(true);
      } else {
        setId("");
        setSaveId(false);
      }
    },
    [cookies]
  );

  const onChangeLoginInput = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    }
    if (name === "pwd") {
      setPwd(value);
    }
  };
  const loginHandler = () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (pwd === "") {
      alert("패스워드를 입력해주세요");
      return;
    }

    // 로그인 axios
    axios
      .post("http://localhost:3000/login", null, { params: { id, pwd } })
      .then((resp) => {
        if (resp.data.id) {
          localStorage.setItem("login", resp.data.id);
          setId("");
          setPwd("");
          navi("/");
        } else {
          alert("입력하신 정보가 틀렸습니다.");
          setPwd("");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2>로그인하기</h2>
      <br />
      <div style={centerStyle}>
        <br />
        <table className="table">
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  size="20"
                  name="id"
                  value={id}
                  onChange={onChangeLoginInput}
                />
              </td>
            </tr>
            <tr>
              <th>패스워드</th>
              <td>
                <input
                  type="password"
                  className="form-control"
                  size="20"
                  name="pwd"
                  value={pwd}
                  onChange={onChangeLoginInput}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <div align="center">
                  <input type="checkbox" id="chk_save_id" onChange={checkHandler} checked={saveId} />
                  &nbsp;&nbsp;ID 저장
                  <br />
                  <br />
                  <span>
                    <input type="button" className="btn btn-primary" readOnly value="Login" onClick={loginHandler} />
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>
                    <a href="regi.html">회원가입</a>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Login;
