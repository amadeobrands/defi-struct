import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AllStrategies from './pages/AllStrategies'
import StratPage from './pages/StratPage'
import Navbar from './nav/Navbar'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/strategies" element={<AllStrategies />} />
          <Route path='/strategies/:id' element={<StratPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
