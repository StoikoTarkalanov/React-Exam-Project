import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div id='container'>
      <Navigation />

      <main id='site-content'>
        <Home />
      </main>

      <Footer />
    </div>
  );
}

export default App;
