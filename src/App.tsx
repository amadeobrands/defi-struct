/* ~~/src/App.tsx */

// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import AllStrategies from '@/pages/AllStrategies'
import StratPage from '@/pages/StratPage'
import Navbar from '@/nav/Navbar'

function App() {
  const [web3, setWeb3] = useState(null)

  useEffect(() => {
    const web3Instance = () => {
      // @ts-ignore
      if (window.ethereum) {
        try {
          // @ts-ignore
          window.ethereum.request({ method: 'eth_requestAccounts' })
          // @ts-ignore
          const web3 = new Web3(window.ethereum)
          // @ts-ignore
          setWeb3(web3)
        } catch (err) {
          console.error(err)
        }
      }
    }
    web3Instance()
  }, [])

  return (
    <div className="site-wrapper">
      <BrowserRouter>
        {/* @ts-ignore */}
        <Navbar web3={web3} />
        <Routes>
          <Route path="/" element={<AllStrategies />} />
          {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          <Route path="/strategies" element={<AllStrategies />} />
          <Route path="/strategies/:id" element={<StratPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
