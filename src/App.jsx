import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Collection from './pages/Collection';
import Discover from './pages/Discover';
import About from './pages/About';
import Landing from './pages/Landing';
import Movie from './pages/Movie';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'sonner';
import GenreProvider from './components/GenreProvider';
import Loading from './pages/helper';

function App() {
  return (
    <BrowserRouter>
    <Toaster/>
    <GenreProvider>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query?" element={<Search />} />
        <Route path="/movie/:id" element={<Movie/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Loading />} />
      </Routes>
      <Footer />
      </GenreProvider>
    </BrowserRouter>
  );
}

export default App;
