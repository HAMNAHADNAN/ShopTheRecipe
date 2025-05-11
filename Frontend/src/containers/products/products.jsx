import React from 'react';
import AllProdSec from '../../components/allProductsSec/allProductsSec';
import Footer from "../../components/landing/footer/footer";

const Section = ({ children }) => {
    return (<div className="catalog-section">{children}</div>);
}

const Products = () => {
    return (
        <div className='w-full'>
            <AllProdSec/>
            <Footer/>
     </div>
    );
}

export default Products;
