// import react from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './main.css'; // footer를 하단에 고정
import Home from './component/Home';
import Bbslist from './bbs/Bbslist';
import Bbswrite from './bbs/Bbswrite';
import BbsDetail from './bbs/BbsDetail';
import Login from './auth/Login';
import { useEffect, useState } from 'react';
import Bbsupdate from './bbs/Bbsupdate';
import Bbsanswer from './bbs/Bbsanswer';

function App() {
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setLogin(localStorage.getItem('login'));
  }, []);
  const handleLogout = () => {
    // 로그아웃 시에 수행할 작업
    localStorage.removeItem('login');
    setLogin(null);
  };
  return (
    <div>
      <header className="py-4">
        <div className="container text-center">
          <img alt="no" src="/header.jpg" width="960" height="150" />
        </div>
      </header>
      <div style={{ marginBottom: '30px' }}>
        <BrowserRouter>
          <nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbar-content">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/bbslist">
                      게시판
                    </Link>
                  </li>
                  {login ? (
                    <li className="nav-item">
                      <div
                        style={{ cursor: 'pointer' }}
                        className="nav-link"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </div>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        로그인
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <main>
            <div className="py-4">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/bbslist" element={<Bbslist />} />
                  <Route
                    path="/login"
                    element={<Login setLogin={setLogin} />}
                  />
                  <Route path="/bbswrite" element={<Bbswrite />} />
                  <Route path="/bbsdetail/:seq" element={<BbsDetail />} />
                  <Route path="/bbsupdate/:seq" element={<Bbsupdate />} />
                  <Route
                    path="/bbsanswer/:seq/:originalTitle"
                    element={<Bbsanswer />}
                  />
                </Routes>
              </div>
            </div>
          </main>
        </BrowserRouter>
      </div>

      <footer className="py-4 bg-info text-light">
        <div className="container text-center">
          <ul className="nav justify-content-center mb-3">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Top
              </a>
            </li>
          </ul>
          <p>
            <small>Copyright &copy;Graphic Arts</small>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
