import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination"; // npm i react-js-pagination

import arrow from "../asset/arrow1.png";

import "./Bbslist.css";
import "./page.css";

function Bbslist() {
  const [bbslist, setBbslist] = useState([]);

  // 검색
  const [choice, setChoice] = useState("");
  const [search, setSearch] = useState("");

  // 페이징
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const getBbslist = (c, s, pn) => {
    axios
      .get("http://localhost:3000/bbslist", { params: { choice: c, search: s, pageNumber: pn } })
      .then((resp) => {
        console.log(resp.data);
        setBbslist(resp.data.bbslist);
        setTotalCnt(resp.data.cnt); // 글의 총수
      })
      .catch((err) => {
        alert(err);
      });
  };

  const searchButton = () => {
    // choice, search 검사
    if (choice === "") {
      alert("카태고리를 선택해 주십시오");
      return;
    }

    getBbslist(choice, search, 0);
  };

  const handlePageChange = (page) => {
    setPage(page);
    getBbslist(choice, search, page - 1);
  };

  useEffect(() => {
    getBbslist("", "", 0);
  }, []);

  return (
    <div>
      <table style={{ marginLeft: "auto", marginRight: "auto", marginTop: "3px", marginBottom: "3px" }}>
        <tbody>
          <tr>
            <td style={{ paddingLeft: "3px" }}>
              <select className="custom-select" value={choice} onChange={(e) => setChoice(e.target.value)}>
                <option value="">검색</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
              </select>
            </td>
            <td style={{ paddingLeft: "5px" }} className="align-middle">
              <input
                className="form-control"
                placeholder="검색어"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </td>
            <td style={{ paddingLeft: "5px" }}>
              <span>
                <button className="btn btn-primary" onClick={searchButton}>
                  검색
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <table className="table table-hover">
        <colgroup>
          <col width="70" />
          <col width="600" />
          <col width="150" />
        </colgroup>
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

      <br />

      {/* https://mui.com/material-ui/react-pagination/ */}
      {/* css 첫번째와 두번째의 경우 */}
      {/* <Pagination            
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalCnt}
            pageRangeDisplayed={5}
            prevPageText={"이전"}
            nextPageText={"다음"}
            onChange={handlePageChange} />  */}

      {/* css 세번째의 경우 */}
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={"이전"}
        nextPageText={"다음"}
        onChange={handlePageChange}
      />

      <div className="my-5 d-flex justify-content-center">
        <Link className="btn btn-primary" to="/bbswrite">
          글쓰기
        </Link>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

function TableRow(props) {
  return (
    <tr>
      <th>{props.num}</th>
      {/* <td className='underline'>{ props.bbs.title }</td> */}
      {delBbsRow(props)}
      <td>{props.bbs.id}</td>
    </tr>
  );
}

// 삭제된 글처리
function delBbsRow(props) {
  if (props.bbs.del === 0) {
    return (
      <td className="underline">
        {getArrow(props.bbs.depth)}
        <Link to={`/bbsdetail/${props.bbs.seq}`}>{props.bbs.title}</Link>
        {/* /bbsdetail?seq= + props.bbs.seq */}
      </td>
    );
  }

  return <td>- 이 글은 사용자의 의해서 삭제되었습니다 -</td>;
}

function getArrow(depth) {
  let nbsp = "&nbsp;&nbsp;&nbsp;&nbsp;";

  let ts = "";
  for (let i = 0; i < depth; i++) {
    ts += nbsp;
  }

  // String -> html
  let space = <span dangerouslySetInnerHTML={{ __html: ts }}></span>;
  if (depth === 0) {
    return "";
  }

  return (
    <>
      {space}
      <img src={arrow} alt="no arrow" width="20px" height="20px" />
      &nbsp;
    </>
  );
}

export default Bbslist;
