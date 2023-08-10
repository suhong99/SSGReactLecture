import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Bbslist.css";

function Bbslist() {
  const [bbslist, setBbslist] = useState([]);

  const getBbslist = () => {
    axios
      .get("http://localhost:3000/bbslist", { params: { choice: "", search: "", pageNumber: 0 } })
      .then((resp) => {
        console.log(resp.data);
        setBbslist(resp.data.bbslist);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getBbslist();
  }, []);

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {bbslist.map((bbs, i) => {
            return <TableRow bbs={bbs} num={i + 1} key={i} />;
          })}
        </tbody>
      </table>

      <div className="my-5 d-flex justify-content-center">
        <Link className="btn btn-primary" to="/bbswrite">
          글쓰기
        </Link>
      </div>
    </div>
  );
}

function TableRow(props) {
  return (
    <tr>
      <th>{props.num}</th>
      <td className="underline">{props.bbs.title}</td>
      <td>{props.bbs.id}</td>
    </tr>
  );
}

export default Bbslist;
