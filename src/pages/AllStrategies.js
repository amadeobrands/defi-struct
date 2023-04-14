

import StrategyList from "../components/StrategyList"


const Strategies = () => {
  return (
    <div className="page-wrapper">
      <main>
        <h1>All Strategies</h1>
        <div className="strat-title-bar">
          <h2>Asset</h2>
          <h2>Strategy</h2>
          <h2>Risk</h2>
          <h2>REP Score</h2>
          <h2>APY</h2>
          <h2>TVL</h2>
        </div>
        <StrategyList />
      </main>
    </div>
  )
}

export default Strategies