import { useState } from 'react'
import StratNav from '../nav/StratNav'
import StrategyList from "../components/StrategyList"
import UsdcToEth from "../components/UsdcToEth"

import DepositForm from '../components/DepositForm'
import WithdrawForm from '../components/WithdrawForm'





const Strategy = ( ) => {

  const [id, setId] = useState('')

  const handlePageSelect = (e) => {
      setId(e.currentTarget.id)
  }

  return (
    <div className="page-wrapper">
      <main className="strat-info-container">
        <StratNav page={id} />
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