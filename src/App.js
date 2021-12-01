import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';

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
import About from './components/About';
import Details from './components/Details';

function App() {
  const [user, setUser] = useState({
    objectId: '',
    username: '',
    sessionToken: '',
  });

  const login = (authData) => {
    setUser(authData);
  };

  // const onLogout = () => {};

  return (
    <AuthContext.Provider value={{ user, login }}>
      <div id="container">
        <Navigation />

        <main id="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-cars" element={<Catalog />} />
            <Route path="/user-cars" element={<UserCatalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<Create />} />
            <Route path="/details/:carId" element={<Details />} />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
