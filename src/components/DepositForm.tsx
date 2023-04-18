/* ~~/src/components/DepositForm.tsx */

import { useState, useEffect, useCallback } from 'react'
import Web3 from 'web3'
import exampleToken from '@/tokens/exampleToken.json'
import vaultAbi from '@/tokens/vaultContract.json'
import { useParams } from 'react-router-dom'

const DepositForm = () => {
  const [ethAmount, setEthAmount] = useState('')
  const [allowanceAmount, setAllowanceAmount] = useState('')

  const { id } = useParams()

  const stratId = id

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

  const handleEthChange = event => {
    const { value } = event.target
    // @ts-ignore
    setEthAmount(Number(value))
  }

  const handleAllowanceChange = event => {
    const { value } = event.target

    // @ts-ignore
    setAllowanceAmount(Number(value))
  }

  // get contract data and save to global variables
  useEffect(() => {
    const getContract = async () => {
      let _window: { ethereum?: any } & Window = window
      if (!_window.ethereum) {
        console.error('Web3 not found!')
        return
      }
      const web3 = new Web3(_window.ethereum)
      // @ts-ignore
      setWeb3(web3)
      const accounts = await web3.eth.requestAccounts()
      // @ts-ignore
      setAccounts(accounts)
      console.log('accounts->', accounts)

      // @ts-ignore
      const contract = new web3.eth.Contract(exampleToken, contractAddress)
      const balance = await contract.methods.balanceOf(accounts[0]).call()

      const humanBalance = web3.utils.fromWei(balance.toString(), 'ether')
      setTokenBalance(humanBalance)
      // @ts-ignore
      setContract(contract)
      setSymbol(await contract.methods.symbol().call())

      // @ts-ignore
      const vaultContract = new web3.eth.Contract(vaultAbi, vaultAddress)
      // @ts-ignore
      setVaultContract(vaultContract)
    }
    getContract()
    // @ts-ignore
    console.log('contract', contract.methods)
  }, [vaultAddress, contractAddress])

  const handleAllowance = useCallback(
    async event => {
      event.preventDefault()
      // @ts-ignore
      console.log('contract', contract.methods)
      console.log('allowanceAmount ->', allowanceAmount)
      // @ts-ignore
      const allowanceDeposit = web3.utils.toWei(allowanceAmount.toString(), 'mwei')
      console.log('allowanceDeposit ->', allowanceDeposit)

      try {
        // @ts-ignore
        if (allowanceAmount > 0) {
          console.log('account from =>', accounts)
          // @ts-ignore
          await web3.eth.currentProvider.enable()
          // @ts-ignore
          const allowance = await contract.methods
            .approve(vaultAddress, allowanceDeposit)
            .send({ from: accounts[0] })
          // const tx = await contract.methods.allowance(accounts[0], vaultAddress ).call();
          console.log('allowance ->', allowance)
          setApproved(allowance)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [allowanceAmount, accounts, web3, contract, vaultAddress]
  )

  const handleDeposit = useCallback(
    async event => {
      event.preventDefault()

      // @ts-ignore
      const ethDeposit = web3.utils.toWei(ethAmount.toString(), 'ether')
      console.log('converting eth amount ->', ethDeposit)

      console.log('pre-deposit info', contractAddress, typeof ethDeposit)
      try {
        // @ts-ignore
        if (ethAmount > 0 && accounts) {
          // @ts-ignore
          await web3.eth.currentProvider.enable()
          // @ts-ignore
          const tx = await vaultContract.methods
            .deposit(ethDeposit, accounts[0])
            .send({ from: accounts[0] })
          console.log('EEE transfer successful!', tx)
          setApproved(tx)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [accounts, web3, vaultContract, ethAmount]
  )

  // Opens link to external website based on social link clicked
  function handleExternalLink(approved) {
    if (!!approved) {
      window.open(`https://sepolia.etherscan.io/tx/${approved.transactionHash}`, '_blank')
    }
  }

  function handleClosePopUp(e) {
    if (e.target.className !== 'approved-tx') {
      setApproved(null)
    }
  }

  return (
    <>
      <form className="transfer-form" onSubmit={handleAllowance}>
        <h2>Allowance Form</h2>
        <label>
          <p>Max Allowance:</p>
        </label>
        <input
          type="number"
          placeholder="0"
          value={allowanceAmount}
          onChange={handleAllowanceChange}
        />

        <button type="submit">Allow</button>
      </form>

      <form className="transfer-form" onSubmit={handleDeposit}>
        <h2>Deposit Form</h2>
        <label>
          <p>
            {symbol && symbol} Balance: {tokenBalance && <span>{tokenBalance}</span>}
          </p>
        </label>
        <input type="number" placeholder="0" value={ethAmount} onChange={handleEthChange} />

        <br />
        <button type="submit">Deposit</button>
      </form>
      {approved && (
        <div onClick={handleClosePopUp} className="approved-tx-container">
          <div className="approved-tx">
            <p>Success!</p>
            <p onClick={handleExternalLink}>View Transaction on Etherscan</p>
          </div>
        </div>
      )}
    </>
  )
}

export default DepositForm
