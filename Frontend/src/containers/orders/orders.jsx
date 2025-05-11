import React from 'react';
import UserOrderDetails from '../../components/orders/orderssec';
import Footer from "../../components/landing/footer/footer";

const Section = ({ children }) => {
    return (<div className="catalog-section">{children}</div>);
}

const Orders = () => {
    return (
        <div className='w-full'>
            <UserOrderDetails/>
            <Footer/>
     </div>
    );
}

export default Orders;
