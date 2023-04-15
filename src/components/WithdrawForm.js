import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import exampleToken from '../tokens/exampleToken.json'
import vaultAbi from '../tokens/vaultContract.json'



const WithdrawForm = () => {

  const [withdrawAmount, setWithdrawAmount] = useState('');

  //Account, contract, and web3 variables
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [vaultContract, setVaultContract] = useState([]);
  const [tokenBalance, setTokenBalance] = useState('');
  const [approved, setApproved] = useState(null)

  const contractAddress = '0x0bA5f4cec3eeAaB0fbEF6AF12662BAd760e0D7f9'
  const vaultAddress = '0x7A31f183E3b59E8FE7a62a18431e73593F3184fe'

  const handleValueChange = (event) => {
    const { value } = event.target;
    setWithdrawAmount(Number(value));
  };

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
      const contract = new web3.eth.Contract(exampleToken, vaultAddress);
      const balance = await contract.methods.balanceOf(accounts[0]).call()
      console.log('balance', balance)
      setContract(contract);

      // Vault contract
      const vaultContract = new web3.eth.Contract(vaultAbi, vaultAddress)
      const vaultBalance = await vaultContract.methods.balanceOf(accounts[0]).call()
      console.log('vault balance', vaultBalance)
      setVaultContract(vaultContract);
      setTokenBalance(web3.utils.fromWei(vaultBalance.toString(), 'ether'))
    }
    getContract()
    console.log('contract', vaultContract.methods)
  }, [])

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
  },[accounts, web3, vaultContract, withdrawAmount])

  // Opens link to external website based on social link clicked
  function handleExternalLink(e) {
    window.open(`https://sepolia.etherscan.io/tx/${approved.transactionHash}`, '_blank')
  }

  function handleClosePopUp(e) {
    if (e.target.className !== 'approved-tx') {
      setApproved(null)
    }
  }

  return (
    <>
      <form className="transfer-form" onSubmit={handleWithdraw}>
        <h2>Withdraw Form</h2>
        <label>
          vEEE Amount:
          <p>Balance: {tokenBalance && <span>{tokenBalance}</span>}</p>
          <input type="number" placeholder='0' value={withdrawAmount} onChange={handleValueChange} />
        </label>
        <br />
        <button type="submit">Withdraw</button>
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