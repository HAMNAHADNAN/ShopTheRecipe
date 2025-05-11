import React from 'react';
import Footer from "../../components/landing/footer/footer";
import CartSec from '../../components/cart/cartsec';

const Section = ({ children }) => {
    return (<div className="catalog-section">{children}</div>);
}

const Contact = () => {
    return (
        <div className='w-full'>
            <CartSec/>
            <Footer/>
     </div>
    );
}

export default Contact;
