import React from 'react';

import Footer from "../../components/landing/footer/footer";
import RecipeList from '../../components/recipes/recipelist';

const Section = ({ children }) => {
    return (<div className="recipe-section">{children}</div>);
}

const Recipes = () => {
    return (
        <div className='w-full'>
            <RecipeList/>
            <Footer/>
     </div>
    );
}

export default Recipes;