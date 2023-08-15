import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./Bbswrite.css";

function Bbsanswer() {
  let navigate = useNavigate();
  const { seq } = useParams();
  const { originalTitle } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const id = localStorage.getItem("login");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getBbsDetail = async (seq) => {
    await axios
      .get("http://localhost:3000/bbsdetail", { params: { seq } })
      .then((resp) => {
        setIsLoading(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login !== null) {
      //const id = JSON.parse(login).id;
      getBbsDetail(seq);
    } else {
      alert("로그인해 주십시오");
    }
  }, [seq]);

  // useRef : element를 접근 current

  function writeBbs() {
    if (title === undefined || title.trim() === "") {
      alert("제목을 작성해 주십시오");
      return;
    }

    axios
      .post("http://localhost:3000/bbsanswer", null, { params: { seq, id: id, title: title, content: content } })
      .then((resp) => {
        // alert(resp.data);
        alert("답글이 등록되었습니다");

        navigate("/bbslist");
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (!isLoading) {
    <div>loading...</div>;
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
            <th>원글 제목</th>
            <td>{originalTitle}</td>
          </tr>
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
          답글 작성완료
        </button>
      </div>

      <br />
      <br />
    </div>
  );
}

export default Bbsanswer;
