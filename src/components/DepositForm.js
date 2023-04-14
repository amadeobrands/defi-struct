
import React, { useState } from 'react';
import Web3 from 'web3';



const DepositForm = () => {
  const [ethAmount, setEthAmount] = useState(0);
  const [usdcAmount, setUsdcAmount] = useState(0);

  const windowWithEthereum = window // Cast window as WindowWithEthereum

  const handleEthChange = (event) => {
    const { value } = event.target;
    setEthAmount(Number(value));
  };

  const handleUsdcChange = (event) => {
    const { value } = event.target;
    setUsdcAmount(Number(value));
  };

  const handleDeposit = async (event) => {
    event.preventDefault();
    if (!windowWithEthereum.ethereum) {
      console.error('Web3 not found!');
      return;
    }
    const web3 = new Web3(windowWithEthereum.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const contractAddress = '<your contract address here>';
    const contractABI = [
      // add your contract ABI here
    ];
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const ethDeposit = web3.utils.toWei(ethAmount.toString(), 'ether');
    const usdcDeposit = web3.utils.toWei(usdcAmount.toString(), 'mwei');
    try {
      if (ethAmount > 0) {
        const tx = await contract.methods.depositEth().send({ value: ethDeposit, from: accounts[0] });
        console.log('ETH deposit successful!', tx);
      }
      if (usdcAmount > 0) {
        const tx = await contract.methods.depositUsdc(usdcDeposit).send({ from: accounts[0] });
        console.log('USDC deposit successful!', tx);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleDeposit}>
      <label>
        ETH Amount:
        <input type="number" value={ethAmount} onChange={handleEthChange} />
      </label>
      <br />
      <label>
        USDC Amount:
        <input type="number" value={usdcAmount} onChange={handleUsdcChange} />
      </label>
      <br />
      <button type="submit">Deposit</button>
    </form>
  );
};

export default DepositForm;
