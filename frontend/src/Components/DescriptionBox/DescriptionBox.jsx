import React from 'react'
import './DescriptionBox.css'
 
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
       <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box"><div>Description</div></div>
        <div className="descriptionbox-nav-box fade">Reviews</div>
       </div>
       <div className="descriptionbox-description">
        <p>Detailed description</p>
       </div>
    </div>
  )
}
export default DescriptionBox;
