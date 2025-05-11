import React from 'react';
import { Routes, Route } from "react-router-dom";
import BaseComponent from "../components/baseComponent/baseComponent";
import Landing from "../containers/landing/landing";
import Catalog from '../containers/catalog/catalog';
import Recipes from '../containers/recipes/recipes';
import Contact from '../containers/contact/contact'
import Signup from '../containers/signup/signup';
import Login from '../containers/login/login';
import Cart from '../containers/cart/cart';
import Profile from '../containers/profile/profile';
import Orders from '../containers/orders/orders';
import SearchResultsPage from '../containers/searchresults/searchresultspage';
import RecipeDetailPage from '../containers/recipedetailpage/recipedetailpage';
import Products from '../containers/products/products';
import Checkout from '../components/checkout/checkoutsec';
import AdminPortal from '../containers/adminportal/adminportal';
import AdminRecipes from '../containers/admin/recipes';
import AdminIngredients from '../containers/admin/ingredients';
import AdminOrders from '../containers/admin/orders';
import AdminUsers from '../containers/admin/users';
import AdminCarts from '../containers/admin/cart';
import AdminContactForm from '../containers/admin/contactform';
import SearchResults from '../components/landing/search/searchresults';

const Navigation = () => {
  return (
    <Routes>
        <Route path="/" element={<BaseComponent />}>
            <Route index element={<Landing />} />
        <Route path="catalog" element={<Catalog />}/>
        <Route path="recipes" element={<Recipes/>}/>
        <Route path="contact" element={<Contact />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="login" element={<Login />}/>
        <Route path="/cart/:id" element={<Cart />}/>
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="/orders/:id" element={<Orders />}/>
        {/* <Route path="searchresults" element={<SearchResultsPage />}/> */}
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="products" element={<Products />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/adminportal" element={<AdminPortal />} />
        <Route path="/admin/recipes" element={<AdminRecipes/>} />
        <Route path="/admin/ingredients" element={<AdminIngredients/>} />
        <Route path="/admin/orders" element={<AdminOrders/>} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/cart" element={<AdminCarts/>} />
        <Route path="/admin/contactform" element={<AdminContactForm/>}/>
        <Route path="searchresults" element={<SearchResults/>}/>




        </Route>
    </Routes>
  );
}

export default Navigation;
