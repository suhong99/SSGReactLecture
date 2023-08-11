import React, { useEffect, useState } from "react";
import axios from "axios";
const Bbswrite = () => {
  const id = localStorage.getItem("login");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitable, setIsSubmitable] = useState(false);
  useEffect(() => {
    if (title === "" || content === "") {
      setIsSubmitable(false);
    } else if (isSubmitable === false) {
      setIsSubmitable(true);
    }
  }, [title, content, isSubmitable]);
  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    }

    if (name === "content") {
      setContent(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 이동을 하지 않도록 설정하는 함수

    if (id !== null) {
      axios
        .post("http://localhost:3000/bbswrite", null, {
          params: { id, title, content },
        })
        .then((resp) => {
          console.log(resp.data);
          alert("게시글 작성 성공!");
          window.location.href = "/bbslist";
        })
        .catch((err) => {
          alert("게시글 작성 실패~");
        });
    } else {
      alert("로그인해 주십시오");
    }
  };
  return (
    <div>
      <h1>글쓰기</h1>
      <form name="frm" onSubmit={onSubmit}>
        <div>
          <div>아이디</div>
          <div>{id}</div>
        </div>
        <div>
          <div>제목</div>
          <input type="text" value={title} name="title" onChange={onChangeValue} />
        </div>
        <div>
          <div>내용</div>
          <textarea type="text" value={content} name="content" onChange={onChangeValue} />
        </div>
        <button type="submit" disabled={!setIsSubmitable}>
          작성하기
        </button>
      </form>
    </div>
  );
};

export default Bbswrite;
