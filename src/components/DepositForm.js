import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import exampleToken from '../tokens/exampleToken.json'



const DepositForm = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [allowanceAmount, setAllowanceAmount] = useState('');

  //Account, contract, and web3 variables
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);

  const contractAddress = '0x0bA5f4cec3eeAaB0fbEF6AF12662BAd760e0D7f9'
  const vaultAddress = '0x7A31f183E3b59E8FE7a62a18431e73593F3184fe'

  const handleEthChange = (event) => {
    const { value } = event.target;
    setEthAmount(Number(value));
  };

  const handleAllowanceChange = (event) => {
    const { value } = event.target;
    setAllowanceAmount(Number(value));
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
      
      
      const contract = new web3.eth.Contract(exampleToken, contractAddress);
      setContract(contract);
    }
    getContract()
    console.log('contract', contract.methods)
  }, [])

  const handleAllowance = useCallback(async (event) => {
    event.preventDefault()
    console.log('contract', contract.methods)
    console.log('allowanceAmount ->', allowanceAmount)
    const allowanceDeposit = web3.utils.toWei(allowanceAmount.toString(), 'mwei')
    console.log('allowanceDeposit ->', allowanceDeposit)

    try {
      if (allowanceAmount > 0) {
        console.log('account from =>', accounts)
        await web3.eth.currentProvider.enable()
        const allowance = await contract.methods.approve(vaultAddress, allowanceDeposit).send({ from: accounts[0] })
        // const tx = await contract.methods.allowance(accounts[0], vaultAddress ).call();
        console.log('allowance ->', allowance)
        // console.log('Allowance successful!', tx);
      }
    } catch (error) {
      console.error(error);
    }
  }, [allowanceAmount, accounts, web3, contract])

  const handleDeposit = useCallback(async (event) => {
    event.preventDefault();
    
    const ethDeposit = web3.utils.toWei(ethAmount.toString(), 'ether');
    console.log('converting eth amount ->', ethDeposit)

    console.log('pre-deposit info', contractAddress, typeof ethDeposit)
    try {
      if (ethAmount > 0 && accounts) {
        await web3.eth.currentProvider.enable()
        const tx = await contract.methods.transfer(vaultAddress, ethDeposit).send({ from: accounts[0] });
        console.log('ETH deposit successful!', tx);
      }
    } catch (error) {
      console.error(error);
    }
  },[accounts, web3, contract, ethAmount])

  return (
    <>
      <form className="transfer-form" onSubmit={handleAllowance}>
        <label>
          Max Allowance Amount:
          <input type="number" placeholder='0' value={allowanceAmount} onChange={handleAllowanceChange} />
        </label>
        <button type="submit">Allow</button>
      </form>

      <form className="transfer-form" onSubmit={handleDeposit}>
        <label>
          EEE Amount:
          <input type="number" placeholder='0' value={ethAmount} onChange={handleEthChange} />
        </label>
        <br />
        <button type="submit">Deposit</button>
      </form>
    </>
  );
};

export default DepositForm;
