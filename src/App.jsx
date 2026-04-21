import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Layout from './Layout/Layout';
import Delivery from './pages/Delivery';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Delivery />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
