import OrdersByDayChart from "../../components/reports/ordersbydaychart";
import Footer from "../../components/landing/footer/footer";
import TopProductsPieChart from "../../components/reports/topproductspiechart";
import UserSignupsChart from "../../components/reports/usersignupchart";
import LowStockChart from "../../components/reports/lowstockchart";
import React from 'react';
import LOGO from "../../assets/logo.png";


const Section = ({ children }) => {
    return (<div className="landing-section">{children}</div>);
}

const Landing = () => {
    return (
        
        <div className='w-full'>
        <img  style={{ 
                    margin: '49px auto 2px',
                    width: '175px'
            }} src={LOGO} alt="logo" className="nav-logo" />
            
           <h1 
            style={{ 
                color: '#000054', 
                textAlign: 'center', 
                fontSize: 'xxx-large', 
                margin: '30px auto 50px' 
            }}
            >
            REPORTS
            </h1>
            <OrdersByDayChart/>
            <hr style={{  margin: '70px 100px' }}/>
            <TopProductsPieChart/>

            <hr style={{  margin: '70px 100px' }}/>
            <UserSignupsChart/>

            <hr style={{  margin: '70px 100px' }}/>
            <LowStockChart/>

            <Footer/>
     </div>
    );
}

export default Landing;
