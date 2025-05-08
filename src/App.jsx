import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTrendingData();
  }, []);
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
