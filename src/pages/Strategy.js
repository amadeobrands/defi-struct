import { useState } from 'react'
import StratNav from '../nav/StratNav'
import StrategyList from "../components/StrategyList"
import UsdcToEth from "../components/UsdcToEth"

import DepositForm from '../components/DepositForm'
import WithdrawForm from '../components/WithdrawForm'
import StrategyInfo from '../components/StrategyInfo'





const Strategy = ( ) => {

  const [id, setId] = useState('')

  const handlePageSelect = (e) => {
      setId(e.currentTarget.id)
      console.log(id)
  }

  return (
    <div className="page-wrapper">
      <main className="strat-info-container">
        <section className='strat-info'>
          <StrategyList />
          <UsdcToEth />
          <div className='strat-info-item'>
            <DepositForm />
            <WithdrawForm />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Strategy