import React from 'react';
import Footer from "../../components/landing/footer/footer";
import CartSec from '../../components/cart/cartsec';
import CheckoutSec from '../../components/checkout/checkoutsec';

const Section = ({ children }) => {
    return (<div className="catalog-section">{children}</div>);
}

const Checkout = () => {
    return (
        <div className='w-full'>
            <CheckoutSec/>
            <Footer/>
     </div>
    );
}

export default Checkout;