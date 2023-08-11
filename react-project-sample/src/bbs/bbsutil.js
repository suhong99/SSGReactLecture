import axios from "axios";

export const bbsdetailButtonHandler = (name, navigation, payload) => {
  if (name === "reply") {
    navigation("/");
  }

  if (name === "update") {
  }

  if (name === "delete") {
    axios
      .post("http://localhost:3000/bbsdelete", null, { params: { seq: payload } })
      .then((resp) => {
        console.log(resp);
        resp.data === "YES" ? navigation("/bbslist") : alert("삭제에 실패하였습니다.");
      })
      .catch((err) => {
        alert(err);
      });
  }
};
