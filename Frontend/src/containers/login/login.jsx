import React from 'react';

import Footer from "../../components/landing/footer/footer";
import Loginsec from '../../components/login/loginsec';

const Section = ({ children }) => {
    return (<div className="recipe-section">{children}</div>);
}

const Login = () => {
    return (
        <div className='w-full'>
            <Loginsec/>
            '<Footer/>
     </div>
    );
}

export default Login;