import React from 'react';

import Footer from "../../components/landing/footer/footer";
import Signupsec from '../../components/signup/signupsec';

const Section = ({ children }) => {
    return (<div className="recipe-section">{children}</div>);
}

const Signup = () => {
    return (
        <div className='w-full'>
            <Signupsec/>
            <Footer/>
     </div>
    );
}

export default Signup;