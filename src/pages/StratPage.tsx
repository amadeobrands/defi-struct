/* ~~/src/pages/StratPage.tsx */

// imports
import { useState } from 'react'
import { Link } from 'react-router-dom'
import StrategyList from '@/components/StrategyList'
import DepositForm from '@/components/DepositForm'
import WithdrawForm from '@/components/WithdrawForm'
import StrategyInfo from '@/components/StrategyInfo'
import Position from '@/components/Position'

// icons
import { ChevronLeft } from 'react-feather'

const StratPage = () => {
  const MENU_ITEMS = [
    {
      page: 'Overview',
      link: '../Strategy',
      name: 'StrategyInfo',
    },
    {
      page: 'Position',
      link: '../Strategy',
      name: 'Position',
    },
    {
      page: 'Deposit',
      link: '../DepositForm',
      name: 'DepositForm',
    },
    {
      page: 'Withdraw',
      link: '../Strategy',
      name: 'WithdrawForm',
    },
  ]

  const [selectedItem, setSelectedItem] = useState('StrategyInfo')

  const handleMenuItemClick = (item: any) => {
    setSelectedItem(item.name)
    console.log(item.name)
  }

  return (
    <div className="page-wrapper">
      <main className="strat-info-container">
        <div className="menu-bar">
          <div className="back-btn">
            <Link className="back-btn" to={'/strategies'}>
              <ChevronLeft />
              <span>Back</span>
            </Link>
          </div>
          {MENU_ITEMS.map(item => (
            <div
              className="menu-bar-item"
              // orig: name={item.name}
              // todo: uncomment
              key={item.page}
              onClick={() => handleMenuItemClick(item)}
            >
              <p>{item.page}</p>
            </div>
          ))}
        </div>
        <section className="strat-info">
          <StrategyList />
          <div className="strat-info-item">
            {selectedItem === 'StrategyInfo' && <StrategyInfo />}
            {selectedItem === 'Position' && <Position />}
            {selectedItem === 'DepositForm' && <DepositForm />}
            {selectedItem === 'WithdrawForm' && <WithdrawForm />}
          </div>
        </section>
      </main>
    </div>
  )
}

export default StratPage
