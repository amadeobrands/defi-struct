import { Link } from 'react-router-dom'
import WalletConnect from '../components/WalletConnect'

import logo from '../assets/DeFi Struct_Logo_Dark.png'

const NavBar = () => {

  return (
    <section className="navbar-container">
      <div className="navbar">
        <div className="navbar-section">
          <Link className="navbar-links" to={'/'}>
            <img src={logo} alt="DeFi struct" />
          </Link>
          <Link className="navbar-links" to={'/strategies'}><h2>Strategies</h2></Link>
          <Link className="navbar-links" to={'/portfolio'}><h2>Portfolio</h2></Link>
        </div>
        <div className="navbar-section">
          <WalletConnect />
        </div>
      </div>
      
    </section>
  )
}

export default NavBar
