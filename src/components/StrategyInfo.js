import { useEffect, useState } from 'react'
import Web3 from 'web3';
import exampleToken from '../tokens/exampleToken.json'
import vaultAbi from '../tokens/vaultContract.json'

import UsdcToEth from "./UsdcToEth"
import StratChart from './StratChart'
import Lens from './Lens'

const StrategyInfo = () => {
  // const [web3, setWeb3] = useState(null);
  // const [accounts, setAccounts] = useState([]);
  // const [contract, setContract] = useState([]);
  // const [vaultContract, setVaultContract] = useState([]);
  // const [tokenBalance, setTokenBalance] = useState('');

  // const contractAddress = '0x0bA5f4cec3eeAaB0fbEF6AF12662BAd760e0D7f9'
  // const vaultAddress = '0x7A31f183E3b59E8FE7a62a18431e73593F3184fe'

  //   // get contract data and save to global variables
  //   useEffect(() => {
  //     const getContract = async () => {
  //       if (!window.ethereum) {
  //         console.error('Web3 not found!');
  //         return;
  //       }
  //       const web3 = new Web3(window.ethereum)
  //       setWeb3(web3)
  //       const accounts = await web3.eth.requestAccounts()
  //       setAccounts(accounts);
  //       console.log('accounts->', accounts)
        
  //       //Token contract
  //       const contract = new web3.eth.Contract(exampleToken, vaultAddress);
  //       const balance = await contract.methods.balanceOf(accounts[0]).call()
  //       console.log('balance', balance)
  //       setContract(contract);
  
  //       // Vault contract
  //       const vaultContract = new web3.eth.Contract(vaultAbi, vaultAddress)
  //       const vaultBalance = await vaultContract.methods.balanceOf(accounts[0]).call()
  //       console.log('vault balance', vaultBalance)
  //       setVaultContract(vaultContract);
  //       setTokenBalance(web3.utils.fromWei(vaultBalance.toString(), 'ether'))
  //     }
  //     getContract()
  //     console.log('contract', vaultContract.methods)
  //   }, [])

  return (
    <>
      <div className="strat-info-top-bar">
        <UsdcToEth />
        <section className="pool-ratio-container">
          <p>Assets in pool:</p>
          <p>50% DAI 3,423</p>
          <p>50% dsDAI 1,234,241</p>
        </section>
      </div>
      <div className="strat-info-mid-bar">
        <StratChart />
        <Lens />
      </div>
    </>
  )
}

export default StrategyInfo