import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bbsdetailButtonHandler } from "./bbsutil";

const BbsDetail = () => {
  const { seq } = useParams();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login !== null) {
      //const id = JSON.parse(login).id;
      getBbsDetail(seq);
    } else {
      alert("로그인해 주십시오");
    }
  }, [seq]);

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
      <br />
      <br />
    </div>
  );
};

export default BbsDetail;
