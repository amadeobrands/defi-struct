import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AllStrategies from './pages/AllStrategies'
import Strategy from './pages/Strategy'
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
          <Route path='/strategies/:id' element={<Strategy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
