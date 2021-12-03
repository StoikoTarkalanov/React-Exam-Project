import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';

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

const initialAuthState = {
  objectId: '',
  username: '',
  sessionToken: '',
};

function App() {
  const [user, setUser] = useLocalStorage('user', initialAuthState);

  const login = (authData) => {
    setUser(authData);
  };

  const logout = () => {
    setUser(initialAuthState);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
