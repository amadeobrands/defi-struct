import { useState, useEffect } from 'react'
import StratNav from '../nav/StratNav'
import StrategyList from "../components/StrategyList"
import UsdcToEth from "../components/UsdcToEth"

import DepositForm from '../components/DepositForm'
import Web3 from 'web3'
import exampleToken from '../tokens/exampleToken.json'
import { longAccount } from '../components/WalletConnect'




const Strategy = ( longAccount ) => {

  const [strategyInfo, setStrategyInfo] = useState({})
  

  const getContract = async (longAccount) => {
    try {
      const web3 = new Web3(window.ethereum);
      // const accounts = await web3.eth.getAccounts();

      // Get contract balance after wallet has been connected
      const tokenAddress = '0x0bA5f4cec3eeAaB0fbEF6AF12662BAd760e0D7f9'
      const vaultAddress = '0x7A31f183E3b59E8FE7a62a18431e73593F3184fe'
      const contract = new web3.eth.Contract(exampleToken, tokenAddress)
      const name = await contract.methods.name().call()
      // console.log('name', name)
      const stratInfo = {
        name: name,
        symbol: contract.methods.symbol().call(),
        decimals: contract.methods.decimals().call(),
        balance: contract.methods.balanceOf(longAccount).call()
      }
      setStrategyInfo(stratInfo)
      console.log('strategyinfo', strategyInfo)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.log(longAccount)
  }, [longAccount])
  
  
  


  return (
    <div className="page-wrapper">
      <main className="strat-info-container">
        <StratNav />
        <section className='strat-info'>
          <StrategyList />
          <UsdcToEth />
          <div className='strat-info-item'>
            {strategyInfo && 
              <p>{strategyInfo.name}</p>
            }
            
            <DepositForm />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Strategy