/* ~~/src/components/StrategyList.tsx */

// imports
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import vaultAbi from '@/tokens/vaultContract.json'

// icons
import dai from '@/assets/dai-logo.svg'
import GHO from '@/assets/GHO-logo.svg'

const StrategyList = () => {
  const { id } = useParams()

  const stratId = id

  const [strategyInfoOne, setStrategyInfoOne] = useState<{supply?: number; symbol?: string}>({})
  const [strategyInfoTwo, setStrategyInfoTwo] = useState<{supply?: number; symbol?: string}>({})

  useEffect(() => {
    const getContract = async () => {
      let _window: { ethereum?: any } & Window = window
      try {
        const web3 = new Web3(_window.ethereum)
        // const accounts = await web3.eth.getAccounts();

        // Vault dsDAI
        const vaultDai = '0xA2031Fa4f934E4D4f35f2B056c1cDD5698D59d11'
        // @ts-ignore
        const vault = new web3.eth.Contract(vaultAbi, vaultDai)
        // console.log(await vault.methods.asset().call())
        const stratInfoOne = {
          name: await vault.methods.name().call(),
          symbol: await vault.methods.symbol().call(),
          decimals: await vault.methods.decimals().call(),
          supply: await vault.methods.totalSupply().call(),
        }
        setStrategyInfoOne(stratInfoOne)

        // Vault 2
        const vaultAddressTwo = '0xA6517200DeCa178ae06989C768065E55DF660909'
        // @ts-ignore
        const vaultTwo = new web3.eth.Contract(vaultAbi, vaultAddressTwo)
        console.log(await vaultTwo.methods.totalSupply().call())
        const stratInfoTwo = {
          name: await vaultTwo.methods.name().call(),
          symbol: await vaultTwo.methods.symbol().call(),
          decimals: await vaultTwo.methods.decimals().call(),
          supply: await vaultTwo.methods.totalSupply().call(),
        }
        setStrategyInfoTwo(stratInfoTwo)
      } catch (err) {
        console.error(err)
      }
    }
    getContract()
  }, [])

  const handleGetId = () => {
    console.log(id)
  }

  return (
    <>
      <Link to={'/strategies/01'}>
        <div
          onClick={handleGetId}
          id="01"
          className="strat-card"
          style={{
            display: (stratId === '01') || !stratId ? 'flex' : 'none',
          }}
        >
          {strategyInfoOne && (
            <>
              <div className="strat-card-asset">
                <img src={dai} alt="DAI" />
                <p>{strategyInfoOne.symbol}</p>
              </div>
              <div className="strat-card-strat">
                <p>{strategyInfoOne.symbol} DCA</p>
              </div>
              <div className="strat-card-risk">
                <p>Low</p>
              </div>
              <div className="strat-card-rep">
                <p>4.5</p>
              </div>
              <div className="strat-card-apy">
                <p>5.5%</p>
              </div>
              <div className="strat-card-tvl">
                <p>{strategyInfoOne.supply}</p>
              </div>
            </>
          )}
        </div>
      </Link>
      <Link to={'/strategies/02'}>
        <div
          id="02"
          className="strat-card strat-two"
          style={{
            display: (stratId === '02') || !stratId ? 'flex' : 'none',
          }}
        >
          {strategyInfoTwo && (
            <>
              <div className="strat-card-asset">
                <img src={GHO} alt="GHO" />
                <p>{strategyInfoTwo.symbol}</p>
              </div>
              <div className="strat-card-strat">
                <p>{strategyInfoTwo.symbol} DCA</p>
              </div>
              <div className="strat-card-risk">
                <p>Low</p>
              </div>
              <div className="strat-card-rep">
                <p>4.5</p>
              </div>
              <div className="strat-card-apy">
                <p>5.5%</p>
              </div>
              <div className="strat-card-tvl">
                <p>{strategyInfoTwo.supply}</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </>
  )
}

export default StrategyList
