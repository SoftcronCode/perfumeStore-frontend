import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../api/apiService';
import { API_URLS } from '../api/apiUrls';
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const UserID = localStorage.getItem('user_id');

    const [cartQty, setCartQty] = useState(0);
    const [wishlistQty, setWishlistQty] = useState(0);

    useEffect(() => {
        const fetchCartQty = async () => {
            const requestBody = {
                userId: UserID,
            };

            try {
                const response = await fetchData(API_URLS.userActivityData, requestBody);
                if (response.responseCode === 1) {
                    const data = JSON.parse(response.responseData);
                    setCartQty(data[0].cart_count);
                    setWishlistQty(data[0].wishlist_count);
                } else {
                    // Show error toast
                    toast.error(response.responseMessage);
                }
            } catch (error) {
                // Handle error as needed
                toast.error(error.message);
            }
        };

        fetchCartQty();
    }, [UserID]);

    return (
        <CartContext.Provider value={{ cartQty, setCartQty, wishlistQty, setWishlistQty }}>
            {children}
        </CartContext.Provider>
    );
};