import React from 'react';

import Footer from "../../components/landing/footer/footer";
import SearchResultSec from '../../components/searchResultSec/searchResultSec';

const Section = ({ children }) => {
    return (<div className="recipe-section">{children}</div>);
}

const SearchResultsPage = () => {
    return (
        <div className='w-full'>
            <SearchResultSec/>
            <Footer/>
     </div>
    );
}

export default SearchResultsPage;