// src/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 301; index++) { // Corrected loop to include 300
    cart[index] = 0;
  }
  return cart;
};

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_product, setAll_Product] = useState([]);

  useEffect(() => {
    fetch('https://chic-closet3-3.onrender.com/allproducts') // Corrected fetch URL
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((error) => console.error('Error fetching all products:', error));

      if(localStorage.getItem('auth-token')){
        fetch('https://chic-closet3-3.onrender.com/getcart',{
          method: 'POST',
          headers:{
            Accept: 'application/form-data',
            'auth-token': `${localStorage.getItem('auth-token')}`
          },
          body: ""
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data));
      }
  }, []); // Added dependency array to run once

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
    if (localStorage.getItem('auth-token')) {
      fetch('https://chic-closet3-3.onrender.com/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error adding to cart:', error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));

    if (localStorage.getItem('auth-token')) {
      fetch('https://chic-closet3-3.onrender.com/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error removing from cart:', error));
    }

  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) { // Ensure itemInfo exists
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount; // Ensure the function returns the total amount
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem; // Ensure the function returns the total item count
  };

  return (
    <ShopContext.Provider value={{ getTotalCartItems, getTotalCartAmount, cartItems, addToCart, removeFromCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useCart = () => {
  return useContext(ShopContext);
};


    




 

