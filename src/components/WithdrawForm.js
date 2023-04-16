import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import exampleToken from '../tokens/exampleToken.json'
import vaultAbi from '../tokens/vaultContract.json'
import { useParams } from 'react-router-dom'

//img
import zkBob from '../assets/zkBob.svg'



const WithdrawForm = () => {

  const [withdrawAmount, setWithdrawAmount] = useState('');

  //Account, contract, and web3 variables
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState([])
  const [vaultContract, setVaultContract] = useState([])
  const [tokenBalance, setTokenBalance] = useState('')
  const [approved, setApproved] = useState(null)
  const [contractAddress, setContractAddress] = useState('')
  const [vaultAddress, setVaultAddress] = useState('')
  const [symbol, setSymbol] = useState('')
  const [bobAddress, setBobAddress] = useState('')

  const { id } = useParams()

  const stratId = id

  useEffect(() => {
    if (stratId === '01') {
      // DAI
      setContractAddress('0x68194a729C2450ad26072b3D33ADaCbcef39D574')
      // dsDAI
      setVaultAddress('0xA2031Fa4f934E4D4f35f2B056c1cDD5698D59d11')
    }

    if (stratId === '02') {
      // GHO
      setContractAddress('0x5d00fab5f2F97C4D682C1053cDCAA59c2c37900D')
      // dsGHO
      setVaultAddress('0xA6517200DeCa178ae06989C768065E55DF660909')
    }
  }, [stratId])

  const handleValueChange = (e) => {
    const { value, name } = e.target
    if (name === 'withdrawAmount') {
      setWithdrawAmount(Number(value))
    }
    if (name === 'bobAddress') {
      setBobAddress(value)
    }
  }

   // get contract data and save to global variables
  useEffect(  () => {
    const getContract = async () => {
      if (!window.ethereum) {
        console.error('Web3 not found!');
        return;
      }
      const web3 = new Web3(window.ethereum)
      setWeb3(web3)
      const accounts = await web3.eth.requestAccounts()
      setAccounts(accounts);
      console.log('accounts->', accounts)
      
      //Token contract
      const contract = new web3.eth.Contract(exampleToken, contractAddress);
      const balance = await contract.methods.balanceOf(accounts[0]).call()
      console.log('balance', balance)
      setContract(contract);

      // Vault contract
      const vaultContract = new web3.eth.Contract(vaultAbi, vaultAddress)
      const vaultBalance = await vaultContract.methods.balanceOf(accounts[0]).call()
      console.log('vault balance', vaultBalance)
      setVaultContract(vaultContract);
      setSymbol(await vaultContract.methods.symbol().call())
      setTokenBalance(web3.utils.fromWei(vaultBalance.toString(), 'ether'))
    }
    getContract()
    console.log('contract', vaultContract.methods)
  }, [vaultAddress, contractAddress])

  // Withdraw function
  const handleWithdraw = useCallback(async (event) => {
    event.preventDefault();
    
    const withdraw = web3.utils.toWei(withdrawAmount.toString(), 'ether');
    console.log('converting eth amount ->', withdraw)

    console.log('pre-deposit info', contractAddress, typeof withdraw)
    try {
      if (withdrawAmount > 0 && accounts) {
        await web3.eth.currentProvider.enable()
        const tx = await vaultContract.methods.withdraw(withdraw, accounts[0], accounts[0]).send({ from: accounts[0] })
        console.log('vEEE withdraw successful!', tx);
      }
    } catch (error) {
      console.error(error);
    }
  },[accounts, web3, vaultContract, withdrawAmount, contractAddress])

  // Opens link to external website based on social link clicked
  function handleExternalLink(e) {
    window.open(`https://sepolia.etherscan.io/tx/${approved.transactionHash}`, '_blank')
  }

  function handleClosePopUp(e) {
    if (e.target.className !== 'approved-tx') {
      setApproved(null)
    }
  }

  // Toggle fuction to show ZK bob withdraw option
  const [showBob, setShowBob] = useState(false)

  const handleShowBob = () => {
    setShowBob(!showBob)
  }

  function handleBob(e) {
    window.open(e.target.id, '_blank')
  }

  return (
    <>
      <form className="transfer-form" onSubmit={handleWithdraw}>
        <h2>Withdraw Form</h2>
        <label>
          <p>{symbol && symbol}  Balance: {tokenBalance && <span>{tokenBalance}</span>}</p>
        </label>
        {showBob ?
          <>
            <p>Quantity:</p>
            <input type="number" name='withdrawAmount' placeholder='0' value={withdrawAmount} onChange={handleValueChange} />
            <p>Address:</p>
            <input type="string" name='bobAddress' placeholder='5fkW3dXTvA8Kizt1EbuRyjWofuqR4Ud1YTjGgY1r8nGosDeSaUreq6bwfF61jWL' value={bobAddress} onChange={handleValueChange} />
            <button type="submit">Withdraw Privately</button>
            <img src={zkBob} alt="zkBob" />
            <p className="bob-link" onClick={handleBob} id="https://docs.zkbob.com/zkbob-app/generate-a-secure-address">Click how to create a Receiving Address</p>
          </>
        :
          <>
            <input type="number" placeholder='0' value={withdrawAmount} onChange={handleValueChange} />
            <button type="submit">Withdraw</button>
          </>
      }
        <label>
          <p>Toggle to withdraw privetely with zkBob</p>
        </label>
        <label className="toggle">
          <input type="checkbox" checked={showBob} onClick={handleShowBob} />
          <span className="slider"></span>
        </label>
      </form>
      {approved && 
        <div onClick={handleClosePopUp} className="approved-tx-container">
          <div 
            className="approved-tx" 
          >
            <p>Success!</p> 
            <p onClick={handleExternalLink}>View Transaction on Etherscan</p>
          </div>
        </div>
      }
    </>
  )
}

export default WithdrawForm