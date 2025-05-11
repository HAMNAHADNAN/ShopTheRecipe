import React from 'react';

import Footer from "../../components/landing/footer/footer";
import RecipeDetail from '../../components/recipedetail/recipedetails';

const Section = ({ children }) => {
    return (<div className="recipe-section">{children}</div>);
}

const RecipeDetailPage = () => {
    return (
        <div className='w-full'>
            <RecipeDetail/>
            <Footer/>
     </div>
    );
}

export default RecipeDetailPage;