import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import * as authService from './services/authService';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import Register from './components/Register';
import Catalog from './components/Catalog';
import UserCatalog from './components/UserCatalog';
import Logout from './components/Logout';
import Create from './components/Create';
import Edit from './components/Edit';

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

  const onLogin = (username) => {
    setUserInfo({
      isAuthenticated: true,
      user: username,
    });
  };

  const onLogout = () => {
    setUserInfo({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <div id='container'>
      <Navigation {...userInfo} />

      <main id='site-content'>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/all-cars' element={<Catalog />} />
          <Route path='/user-cars' element={<UserCatalog />} />
          <Route path='/create' element={<Create />} />
          <Route path='/Edit' element={<Edit />} />
          <Route path='/login' element={<Login onLogin={onLogin} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout onLogout={onLogout} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
