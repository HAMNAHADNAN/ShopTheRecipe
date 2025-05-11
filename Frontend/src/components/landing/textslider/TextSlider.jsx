import React, { useState, useEffect } from 'react';
//import 'C:/Projects/website_3/src/scss/TextSlider.scss';
import '../../../scss/TextSlider.scss'

const slides = [
    <div>
      <h2 className='sliderhead'>"I love how easy it is to find a recipe and instantly shop for the ingredients! It’s a game-changer for busy people like me."</h2>
      <p className='slidertext'>- Sarah A., Foodie & Mom</p>
    </div>,
    <div>
      <h2 className='sliderhead'>"The seamless transition from browsing to buying ingredients makes meal planning so much easier. Great idea!"</h2>
      <p className='slidertext'>- Hamza K., Software Engineer</p>
    </div>,
    <div>
      <h2 className='sliderhead'>"Beautiful interface and a genius concept. I cooked 3 meals this week using ShopTheRecipe!"</h2>
      <p className='slidertext'>- Elena R., Student</p>
    </div>,
    <div>
    <h2 className='sliderhead'>"I used to waste time searching for ingredients separately — now I just click and shop. Brilliant!"</h2>
    <p className='slidertext'>- Murtaza S., Working Professional</p>
  </div>
  ];

const TextSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
       

    <div className="slider">
    <h1>Serving Satisfaction Daily</h1>
    <h3>Hear from Our Happy Cooks</h3>
      <div className="slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;
