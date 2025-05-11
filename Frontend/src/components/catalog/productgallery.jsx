import React, { useState } from 'react';
//import 'C:/Projects/website_3/src/scss/productgallery.scss';
// import '../../scss/productgallery.scss';
import galleryimg1 from '../../assets/galleryimg1.jpg';
import galleryimg2 from '../../assets/galleryimg2.jpg';
import galleryimg3 from '../../assets/galleryimg3.jpg';
import galleryimg4 from '../../assets/galleryimg4.jpg';
import galleryimg5 from '../../assets/galleryimg5.jpg';
import galleryimg6 from '../../assets/galleryimg6.jpg';
import galleryimg7 from '../../assets/galleryimg7.jpg';
import galleryimg8 from '../../assets/galleryimg8.jpg';
import galleryimg9 from '../../assets/galleryimg9.jpg';
import amazon from '../../assets/amazon.png';

const products = [
  {
    id: 1,
    category: 'mirrors',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',
    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg1,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 2,
    category: 'lights',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',
    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg2,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 3,
    category: 'mirrors',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',

    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg3,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 4,
    category: 'lights',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',

    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg4,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 5,
    category: 'lights',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',

    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg5,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 6,
    category: 'mirrors',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',

    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg6,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 7,
    category: 'mirrors',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',

    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg7,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 8,
    category: 'lights',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',

    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg8,
    buyLinks: ['link1', 'link2', 'link3']
  },
  {
    id: 9,
    category: 'mirrors',
    name: 'Lorem ipsum dolor sit amet',
    price: '$000.00',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel gravida diam, congue elementum ex. Phasellus non pretium erat. ',

    modelNumber: 'xxx',
    size: 'xxx',
    brightness: 'very bright',
    imageUrl: galleryimg9,
    buyLinks: ['link1', 'link2', 'link3']
  },
];

const ProductGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="product-gallery">
      <div className="sidebar">
        <button onClick={() => handleCategoryClick('all')}>ALL</button>
        <button onClick={() => handleCategoryClick('lights')}>LIGHTS</button>
        <button onClick={() => handleCategoryClick('mirrors')}>MIRRORS</button>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
            <img src={product.imageUrl} alt={product.name} />
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>—</button>
            <div><h2>{selectedProduct.name}</h2></div><br/>
            <div className='popup-content-div'><img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
            <div className='popup-content-details'><p className='product-price'>{selectedProduct.price}</p>
            <p>{selectedProduct.description}</p>
            <hr/>
            <div className='model-details'>
            <p>Model Number:  &nbsp; {selectedProduct.modelNumber}</p>
            <p>Size: &nbsp; {selectedProduct.size}</p>
            <p>Brightness: &nbsp; {selectedProduct.brightness}</p>
            </div>
            <hr/>
            <div className="buy-links">
              <p>Buy Here: &nbsp;
              <span className='product-links'>{selectedProduct.buyLinks.map((link, index) => (
                <a key={index} href={link}><img src={amazon}/></a>
              ))}</span></p></div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
