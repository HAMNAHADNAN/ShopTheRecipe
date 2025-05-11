import React from 'react';

import Footer from "../../components/landing/footer/footer";
import ProductGallery from '../../components/catalog/productgallery';

const Section = ({ children }) => {
    return (<div className="catalog-section">{children}</div>);
}

const Catalog = () => {
    return (
        <div className='w-full'>
            <ProductGallery/>
            <Footer/>
     </div>
    );
}

export default Catalog;
