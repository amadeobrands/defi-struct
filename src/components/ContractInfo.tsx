/* ~~/src/components/ContractInfo.tsx */

// imports
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import exampleToken from '@/tokens/exampleToken.json'

export const ContractInfo = async () => {
  const [_, setStrategyInfo] = useState({})

  useEffect(() => {
    const getContract = async () => {
      try {
        // @ts-ignore
        const web3 = new Web3(window.ethereum)
        // const accounts = await web3.eth.getAccounts();

        // Get contract balance after wallet has been connected
        const tokenAddress = '0x0bA5f4cec3eeAaB0fbEF6AF12662BAd760e0D7f9'
        // const vaultAddress = '0x7A31f183E3b59E8FE7a62a18431e73593F3184fe' // never read

        // @ts-ignore
        const contract = new web3.eth.Contract(exampleToken, tokenAddress)

        const stratInfo = {
          name: await contract.methods.name().call(),
          symbol: contract.methods.symbol().call(),
          decimals: contract.methods.decimals().call(),
        }
        setStrategyInfo(stratInfo)
      } catch (err) {
        console.error(err)
      }
    }
    getContract()
  }, [])
}
