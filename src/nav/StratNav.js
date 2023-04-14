import { useState } from 'react'


const StratNav = () => {

  const MENU_ITEMS= [
    {
      page: "Strat Name",
      link: '../Strategy',
    },
    {
      page: "Position",
      link: '../Strategy',
    },
    {
      page: "Deposit",
      link: '../DepositForm',
    },
    {
      page: "Withdraw",
      link: '../Strategy',
    },
  ]

  const [selectedItem, setSelectedItem] = useState('');

  const handleMenuItemClick = (item) => {
    setSelectedItem(item.link);
  };

  return (
    <div className='menu-bar'>
      {MENU_ITEMS.map((item) => (
        <div className='menu-bar-item' key={item.page} onClick={() => handleMenuItemClick(item)}>
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