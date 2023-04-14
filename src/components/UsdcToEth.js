import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Icons
import USDC from "../assets/USDC-icon.png"
import ETH from "../assets/ETH-icon2.png"


  const UsdcToEth = () => {
  
    // const [usdcAmount, setUsdcAmount] = useState<number>(1);
    const [ethAmount, setEthAmount] = useState(0);
  
    useEffect(() => {
      const getEthPrice = async () => {
        try {
          const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
          const ethPrice = response.data.ethereum.usd
          setEthAmount(1 / ethPrice) 
        } catch (error) {
          console.error(error);
        }
      };
      getEthPrice();
    }, []);
  

  return (
    <div className='USDC-to-ETH-container'>
      <img src={USDC} alt="USDC" />
      <p>1 USDC = </p>
      <img src={ETH} alt="ETH" />
      <p>{ethAmount.toFixed(4)} ETH</p>
    </div>
  )
}

export default UsdcToEth