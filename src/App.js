import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import * as authService from './services/authService';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    username: '',
  });

  useEffect(() => {
    let user = authService.getUser();

    setUserInfo({
      isAuthenticated: Boolean(user),
      user,
    });
  }, []);

  // const onLogin = (username) => {
  //   setUserInfo({
  //     isAuthenticated: true,
  //     user: username,
  //   });
  // };

  // const onLogout = () => {
  //   setUserInfo({
  //     isAuthenticated: false,
  //     user: null,
  //   });
  // };

  return (
    <div id='container'>
      <Navigation {...userInfo} />

      <main id='site-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
