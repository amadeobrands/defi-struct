import { useState } from 'react'


const StratNav = (id) => {

  const MENU_ITEMS= [
    {
      page: "Strat Name",
      link: '../Strategy',
      id: 'strat'
    },
    {
      page: "Position",
      link: '../Strategy',
      id: 'position'
    },
    {
      page: "Deposit",
      link: '../DepositForm',
      id: 'deposit'
    },
    {
      page: "Withdraw",
      link: '../Strategy',
      id: 'withdraw'
    },
  ]

  const [selectedItem, setSelectedItem] = useState('');

  const handleMenuItemClick = (item) => {
    setSelectedItem(item.link);
  }

  

  return (
    <div className='menu-bar'>
      {MENU_ITEMS.map((item) => (
        <div className='menu-bar-item' id={id} key={item.page} onClick={() => handleMenuItemClick(item)}>
          <p>{item.page}</p>
        </div>
      ))}
      {/* <div className='menu-bar-item'>
        <p>Strat Name</p>
      </div>
      <div className='menu-bar-item'>
        <p>Position</p>
      </div>
      <div className='menu-bar-item'>
        <p>Deposit</p>
      </div>
      <div className='menu-bar-item'>
        <p>Withdraw</p>
      </div> */}
    </div>
)
}

export default StratNav