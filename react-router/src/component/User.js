import { useNavigate } from "react-router-dom";
const User = () => {
  const navi = useNavigate();

  const homemove = () => {
    navi("/"); // ==== location.href
  };
  return (
    <div>
      <h3>User</h3>
      <button onClick={homemove}>Home</button>
    </div>
  );
};
export default User;
