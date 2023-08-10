import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [memlist, setMemList] = useState([]);
  // const fetchData = async () => {
  //   const response = await axios.get("http://localhost:3000/allmember", {});
  //   console.log(response.data);
  // };

  const fetchData2 = async () => {
    await axios
      .post("http://localhost:3000/All", null, {
        params: { title: "제목입니다", number: 1024 },
      })
      .then(function (response) {
        //success
        setMemList(response.data);
      })
      .catch(function (error) {
        // error
        alert(error);
      });
  };
  /*
  const fetchData2 = async () => {
    const response = await axios.get("http://localhost:3000/memberall", {
      params: { title: "제목입니다", number: 1024 },
    });
    console.log(response.data);
  };
*/

  // async function fetchData() {
  //   const response = await axios.get("http://localhost:3000/allmember", {});
  //   console.log(response.data);
  // }

  useEffect(() => {
    // fetchData();
    fetchData2();
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table border={1} style={{ textAlign: "center" }}>
        <colgroup>
          <col style={{ width: "100px" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "70px" }} />
          <col style={{ width: "200px" }} />
          <col style={{ width: "50px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>id</th>
            <th>pwd</th>
            <th>name</th>
            <th>emial</th>
            <th>auth</th>
          </tr>
        </thead>
        <tbody>
          {memlist.map((member, index) => (
            <tr key={index}>
              <td>{member.id}</td>
              <td>{member.pwd}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.auth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
