import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import exampleToken from '../tokens/exampleToken.json'

//icons
import eth from '../assets/ETH-icon.png'

const StrategyList = () => {

  const [strategyInfo, setStrategyInfo] = useState({})
  
  useEffect(() => {
    const getContract = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        // const accounts = await web3.eth.getAccounts();
  
        // Get contract balance after wallet has been connected
        const tokenAddress = '0x0bA5f4cec3eeAaB0fbEF6AF12662BAd760e0D7f9'
        const vaultAddress = '0x7A31f183E3b59E8FE7a62a18431e73593F3184fe'
        const contract = new web3.eth.Contract(exampleToken, tokenAddress)
        const stratInfo = {
          name: await contract.methods.name().call(),
          symbol: await contract.methods.symbol().call(),
          decimals: await contract.methods.decimals().call(),
          supply: await contract.methods.totalSupply().call(),
        }
        setStrategyInfo(stratInfo)
        console.log(strategyInfo)
  
      } catch (err) {
        console.error(err)
      }
    }
    getContract()
  }, [])

  return (
    <Link to={'/strategies/01'}>
      <div className="strat-card">
        {strategyInfo && 
          <>
            <div className="strat-card-asset">
              <img src={eth} alt="ETH" />
              <p>{strategyInfo.symbol}</p>
            </div>
            <div className="strat-card-strat">
              <p>{strategyInfo.symbol} DCA</p>
            </div>
            <div className="strat-card-risk">
              <p>Low</p>
            </div>
            <div className="strat-card-rep">
              <p>4.5</p>
            </div>
            <div className="strat-card-apy">
              <p>5.5%</p>
            </div>
            <div className="strat-card-tvl">
              <p>{strategyInfo.supply}</p>
            </div>
          </>
        }
      </div>
    </Link>
  )
}

export default StrategyList