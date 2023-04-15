import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Web3 from 'web3'

// import Home from './pages/Home'
import AllStrategies from './pages/AllStrategies'
import StratPage from './pages/StratPage'
import Navbar from './nav/Navbar'
// import Portfolio from './pages/Portfolio'

function App() {
  const [web3, setWeb3] = useState(null)

  useEffect(() => {
    const web3Instance = () => {
      if (window.ethereum) {
        try {
          window.ethereum.request({ method: 'eth_requestAccounts' })
          const web3 = new Web3(window.ethereum);
          setWeb3(web3)
        } catch (err) {
          console.error(err);
        }
      }
    }
    web3Instance()
  }, [])

  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <Navbar web3={web3} />
        <Routes>
          <Route path="/" element={<AllStrategies />} />
          {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          <Route path="/strategies" element={<AllStrategies />} />
          <Route path='/strategies/:id' element={<StratPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
