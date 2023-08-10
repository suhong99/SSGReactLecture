// React Router Dom -> location.href
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // npm i react-router-dom
import User from "./component/User";
import Topics, { Topic } from "./component/Topics";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <Link to="/">Home</Link>
          </ul>
          <ul>
            <Link to="/about">About</Link>
          </ul>
          <ul>
            <Link to="/user">User</Link>
          </ul>
          <ul>
            <Link to="/topics">Topics</Link>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/topics" element={<Topics />}></Route>
          <Route path="/topics/:topIp" exact element={<Topic />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return <h1>Home</h1>;
}

const About = () => {
  return <h1>About</h1>;
};
export default App;
