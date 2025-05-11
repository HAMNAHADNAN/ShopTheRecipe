import React, { useEffect, useState } from 'react';
import Container from '../../container/container';

const Partners = () => {
    const [shaded, setShaded] = useState(false);
;

    

    return (
        <div className={`${shaded ? 'bg-[#1a0b1a] ' : ''}w-full background-animation`} id='partners'>
        <div className="bgimg">
            
            
                <div className="partners-upper-container back-img">
                
                <div className="partners-bottom-container">
                    <div data-aos="fade-up-right" className='w-full'>
                        <div className={`${shaded ? 'text-[#FFA12B]' : 'text-[#880DB4]'} title`}>Your Next Meal Starts with a Click</div>
                    </div>
                    <div data-aos="fade-up-right" className='w-full'>
                        <div className={`${shaded ? "text-white" : "text-black"} paragraph`}>Discover delicious recipes and get all the ingredients delivered straight to your cart. ShopTheRecipe transforms everyday cooking into a seamless experience — smart, easy, and inspiring. Whether you’re a home chef or just getting started, your next meal begins here.</div>
                    </div>
                    <div data-aos="fade-up-right" className='w-full'>
  <div className={`${shaded ? "text-black" : "text-white"}`}>
    <a href="/recipes">
      <button className="button" type="button">Shop Now</button>
    </a>
  </div>
</div>
                </div>
                </div>
                
            </div>  
            </div>
       )
}

export default Partners