import React from 'react';

import Footer from "../../components/landing/footer/footer";
import ProfileSec from '../../components/profile/profilesec';

const Section = ({ children }) => {
    return (<div className="recipe-section">{children}</div>);
}

const Profile = () => {
    return (
        <div className='w-full'>
            <ProfileSec/>
            '<Footer/>
     </div>
    );
}

export default Profile;