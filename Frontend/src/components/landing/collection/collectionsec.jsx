import React from 'react';
//import 'C:/Projects/website_3/src/scss/collectionsec.scss';
import '../../../scss/collectionsec.scss'
import collectionImage from '../../../assets/collection.jpg'; 

const CollectionSec = () => {
    return (
        <div className="collection-section">
            <div className='content-container-empty'>

            </div>
            <div className="image-container">
                <img src={collectionImage} alt="Collection" className="collection-image" />
            </div>
            <div className="content-container">
                <h2>Our Star Recipe: Chicken Tikka</h2>
                <p>Craving something bold and flavorful? Our most loved recipe—<b>Chicken Tikka</b>—has won hearts across the board! Perfectly marinated in aromatic spices and grilled to perfection, this dish is not only a visual delight but also a burst of taste in every bite. Whether you're hosting a dinner or just treating yourself, this all-time favorite is a must-try. No wonder it's the most viewed and bought recipe on <i>ShopTheRecipe</i>—because once you try it, there's no going back!</p>
                <a href="/recipes/3">
  <button className="collection-button">View The Recipe</button>
</a>
            </div>
        </div>
    );
};

export default CollectionSec;
