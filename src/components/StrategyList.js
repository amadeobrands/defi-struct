import { Link } from 'react-router-dom'

//icons
import eth from '../assets/ETH-icon.png'

const StrategyList = () => {

  return (
    <Link to={'/strategies/01'}>
      <div className="strat-card">
        <div className="strat-card-asset">
          <img src={eth} alt="ETH" />
          <p>ETH</p>
        </div>
        <div className="strat-card-strat">
          <p>ETH DCA</p>
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
          <p>$1,000,000</p>
        </div>
      </div>
    </Link>
  )
}

export default StrategyList