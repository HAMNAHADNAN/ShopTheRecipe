import OrdersByDayChart from "../../components/reports/ordersbydaychart";
import TopProductsPieChart from "../../components/reports/topproductspiechart";
import React from 'react';


const Section = ({ children }) => {
    return (<div className="landing-section">{children}</div>);
}

const Landing = () => {
    return (
        <div className='w-full'>
            <OrdersByDayChart/>
            <TopProductsPieChart/>
            <Footer/>
     </div>
    );
}

export default Landing;
