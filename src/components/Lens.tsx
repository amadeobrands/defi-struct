/* ~~/src/components/Lens.tsx */

// imports
import defiStruct from '@/assets/DeFi-Struct-logo.png'

const Lens = () => {
  return (
    <div className="lens-container">
      <div className="lens-profile">
        <h2>Creator:</h2>
        <img src={defiStruct} alt="avatar" />
        <h2>Deo</h2>
      </div>
    </div>
  )
}

export default Lens
