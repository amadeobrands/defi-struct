import { useEffect, useState } from 'react';
import Web3 from 'web3';



const WalletConnect = () => {
  const [account, setAccount] = useState('')
  const [network, setNetwork] = useState('')
  const [balance, setBalance] = useState('')
  const [error, setError] = useState(null)
  // const [strategyInfo, setStrategyInfo] = useState({})
  // const [ longAccount, setLongAccount ] = useState('')
  

  const connectWallet = async ({web3} ) => {
 
      if (window.ethereum) {
        try {
          // await window.ethereum.request({ method: 'eth_requestAccounts' })
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts()
          await web3.eth.currentProvider.enable().then(console.log)
          
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
            } else {
              // Set button status to "Change network to Polygon"
            }
          }
          return web3
        } catch (err) {
          console.error(err);
          setError(err)
        }
      } else {
        setError('MetaMask not found!');
      }
  }

  const getNetworkName = (chainId) => {
    switch (chainId) {
      case 11155111:
        return 'SepoliaETH'
      default:
        return 'Polygon Not Connected'
    }
  }

  return (
    <>
      <button className="connect-wallet">
      {network === 'SepoliaETH' ? `${balance}` : 'Select SepoliaETH'}
      </button>
      <button className="connect-wallet" onClick={connectWallet}>
        {account ? `${account}` : 'Connect Wallet'}
      </button>
      {error && <div>{error}</div>}
    </>
  )
};

export default WalletConnect