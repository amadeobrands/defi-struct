
import StratNav from '../nav/StratNav'
import StrategyList from "../components/StrategyList"
import UsdcToEth from "../components/UsdcToEth"

import DepositForm from '../components/DepositForm'





const Strategy = ( ) => {


  return (
    <div className="page-wrapper">
      <main className="strat-info-container">
        <StratNav />
        <section className='strat-info'>
          <StrategyList />
          <UsdcToEth />
          <div className='strat-info-item'>
            
            
            <DepositForm />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Strategy