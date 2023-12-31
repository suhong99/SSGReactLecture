import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Bbswrite.css";

function Bbswrite() {
  let navigate = useNavigate();

  const id = localStorage.getItem("login");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useRef : element를 접근 current

  function writeBbs() {
    if (title === undefined || title.trim() === "") {
      alert("제목을 작성해 주십시오");
      return;
    }

    axios
      .post("http://localhost:3000/bbswrite", null, { params: { id: id, title: title, content: content } })
      .then((resp) => {
        // alert(resp.data);
        alert("등록되었습니다");

        navigate("/bbslist");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="center">
      {/* <h1>글쓰기</h1> */}
      <table className="table table-bordered">
        <colgroup>
          <col width="200" />
          <col width="500" />
        </colgroup>
        <tbody>
          <tr>
            <th>아이디</th>
            <td>{id}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>
              <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea
                cols="15"
                rows="18"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="my-5 d-flex justify-content-center">
        <button onClick={writeBbs} className="btn btn-primary">
          작성완료
        </button>
      </div>

      <br />
      <br />
    </div>
  );
}

export default Bbswrite;
