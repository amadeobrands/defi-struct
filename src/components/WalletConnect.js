import { useEffect, useState } from 'react';
import Web3 from 'web3';
import exampleToken from '../tokens/exampleToken.json'


const WalletConnect = () => {
  const [account, setAccount] = useState('')
  const [network, setNetwork] = useState('')
  const [balance, setBalance] = useState('')
  const [error, setError] = useState('')
  const [strategyInfo, setStrategyInfo] = useState({})
  const [ longAccount, setLongAccount ] = useState('')
  

  const connectWallet = async ( ) => {
    
    try {
      const windowWithEthereum = window 
      if (windowWithEthereum.ethereum) {
        await windowWithEthereum.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(windowWithEthereum.ethereum);
        const accounts = await web3.eth.getAccounts()
        setLongAccount(accounts[0])
        if (accounts.length > 0) {
          const shortenedAddress = accounts[0].slice(0, 5) + '...' + accounts[0].slice(-4);
          setAccount(shortenedAddress);
          console.log('Wallet connected!', accounts[0]);
          const chainId = await web3.eth.getChainId()
          const networkName = getNetworkName(chainId);
          setNetwork(networkName);
          console.log(`Connected to ${networkName}`)
          if (networkName === 'SepoliaETH') {
            if (chainId !== 11155111) {
              setError('Connect Wallet');
            } else {
              setError('');
              const balance = await web3.eth.getBalance(accounts[0])
              console.log(balance)
              const etherBalance = web3.utils.fromWei(balance, 'ether')
              setBalance(`${etherBalance} ETH`)
            }
            // Get contract balance after wallet has been connected
            const tokenAddress = '0x0bA5f4cec3eeAaB0fbEF6AF12662BAd760e0D7f9'
            const vaultAddress = '0x7A31f183E3b59E8FE7a62a18431e73593F3184fe'
            const contract = new web3.eth.Contract(exampleToken, tokenAddress)
            const stratInfo = {
              name: await contract.methods.name().call(),
              symbol: await contract.methods.symbol().call(),
              decimals: await contract.methods.decimals().call(),
              balance: await contract.methods.balanceOf(longAccount).call()
            }
            setStrategyInfo(stratInfo)
          } else {
            // Set button status to "Change network to Polygon"
          }
        }
      } else {
        setError('MetaMask not found!');
      }
    } catch (error) {
      console.error(error);
    }
  }

 


  const getNetworkName = (chainId) => {
    switch (chainId) {
      case 11155111:
        return 'SepoliaETH'
      // case '0x89':
      //   return 'Polygon Testnet';
      default:
        return 'Polygon Not Connected'
    }
  }

  return (
    <>
      <button className="connect-wallet">
      {network === 'SepoliaETH' ? `Balance: ${balance}` : 'Select SepoliaETH'}
      </button>
      <button className="connect-wallet" onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </>
  )
};

export default WalletConnect