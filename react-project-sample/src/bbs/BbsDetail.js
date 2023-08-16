import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bbsdetailButtonHandler } from "./bbsutil";

const BbsDetail = () => {
  const { seq } = useParams();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const login = localStorage.getItem("login");

  const [commentLists, setCommentLists] = useState([{ seq: 0, id: "", content: "", wdate: "" }]);
  const [commentContent, setCommentContent] = useState("");
  const [detail, setDetail] = useState({
    content: "",
    del: 0,
    depth: 0,
    id: "",
    readcount: 0,
    ref: 0,
    seq: seq,
    step: 0,
    title: "",
    wdate: "0000-00-00 00:00:00",
  });

  const getBbsDetail = async (seq) => {
    await axios
      .get("http://localhost:3000/bbsdetail", { params: { seq } })
      .then((resp) => {
        setDetail(resp.data);
        setIsLoading(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const writeComment = () => {
    if (commentContent === undefined || commentContent.trim() === "") {
      alert("내용을 작성해 주십시오");
      return;
    }

    axios
      .post("http://localhost:3000/commentWrite", null, { params: { id: login, content: commentContent, seq } })
      .then(({ data }) => {
        if (data === "YES") {
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0");
          const day = String(now.getDate()).padStart(2, "0");
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");
          const seconds = String(now.getSeconds()).padStart(2, "0");

          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          setCommentLists([
            { seq: commentLists[0].seq + 1, id: login, content: commentContent, wdate: formattedDateTime },
            ...commentLists,
          ]);
        }
        if (data === "NO") {
          alert("작성에 실패하였습니다.");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getCommentList = async (seq) => {
    // alert(seq); //14
    await axios
      .get("http://localhost:3000/commentList", { params: { seq } })
      .then((resp) => {
        setCommentLists(resp.data);
        setIsCommentLoading(true);
        // console.log(resp.data);
      })
      .catch((err) => {
        alert("실패");
      });
  };

  useEffect(() => {
    if (login !== null) {
      //const id = JSON.parse(login).id;
      getBbsDetail(seq);
      getCommentList(seq);
    } else {
      alert("로그인해 주십시오");
    }
  }, [seq, login]);

  if (!isLoading) {
    <div>loading...</div>;
  }
  return (
    <div>
      <div className="center">
        <table className="table table-bordered">
          <colgroup>
            <col width="200"></col>
            <col width="500" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{detail.id}</td>
            </tr>
            <tr>
              <th>작성일</th>
              <td>{detail.wdate}</td>
            </tr>
            <tr>
              <th>조회수</th>
              <td>{detail.readcount}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{detail.title}</td>
            </tr>
            <tr>
              <td colSpan="2" style={{ height: "300px", fontSize: "120%" }}>
                <textarea
                  rows="12"
                  readOnly
                  style={{ backgroundColor: "#ffffff", fontSize: "20px" }}
                  cols="15"
                  className="form-control"
                  value={detail.content}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <div align="right">
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
            onClick={() => bbsdetailButtonHandler("reply", navigation, { seq, originalTitle: detail.title })}
          >
            답글
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
            onClick={() => bbsdetailButtonHandler("update", navigation, seq)}
          >
            글수정
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
            onClick={() => bbsdetailButtonHandler("delete", navigation, seq)}
          >
            글삭제
          </button>
        </div>
      </div>
      <br />
      {/*  댓글 */}
      <div>
        <table>
          <colgroup>
            <col width="900px" />
            <col width="120px" />
          </colgroup>
          <tbody>
            <tr>
              <td>comment</td>
              {/* <td style={{ paddingLeft: "30px" }}>올리기</td> */}
            </tr>
            <tr>
              <td>
                <textarea
                  rows="3"
                  className="form-control"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                ></textarea>
              </td>
              <td style={{ paddingLeft: "30px" }}>
                <button type="button" className="btn btn-primary btn-block p-4" onClick={writeComment}>
                  완료
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <br />

      <table className="table table-sm">
        <colgroup>
          <col width="200" />
          <col width="200" />
        </colgroup>

        <tbody>
          {isCommentLoading &&
            commentLists.map((comment, index) => {
              return (
                <React.Fragment key={index}>
                  <tr className="table-info" key={index}>
                    <td>작성자: {comment.id}</td>
                    <td>작성일: {comment.wdate}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}> {comment.content}</td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
      <br />
      <br />
      <br />
    </div>
  );
};

export default BbsDetail;
