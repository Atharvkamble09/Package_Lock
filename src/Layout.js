import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import { DataContext } from './contexts/Provider';
import { useContext } from 'react';

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      <MainPage/>
    </div>
  );
}

export default Layout;