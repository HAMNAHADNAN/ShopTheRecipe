import React from 'react';
import '../../../scss/homeimg.scss'
import mainImage from '../../../assets/homeimg1.jpg'; 
import Image2 from '../../../assets/homeimg2.jpg';
import Image3 from '../../../assets/homeimg3.jpg';

const HoverImageSection = () => {
    return (
        <div className="homeimg-sec">
  <h2>Cook What You Love!</h2>
  <div className="image-section">
    <div className="main-image-container">
      <a href="/recipes/7">
        <img src={mainImage} alt="Main" className="main-image" />
      </a>
    </div>
    <div className="side-images">
      <div className="side-image-container">
        <a href="/recipes/8">
          <img src={Image2} alt="Side 1" className="side-image" />
        </a>
      </div>
      <div className="side-image-container">
        <a href="/recipes/10">
          <img src={Image3} alt="Side 2" className="side-image" />
        </a>
      </div>
    </div>
  </div>
</div>

    );
};

export default HoverImageSection;
