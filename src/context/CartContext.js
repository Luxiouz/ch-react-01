import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    const addToCart = (item) => {

        const cartCopy = [...cart];
        let found = false;

        for (let i = 0; i < cartCopy.length; i++) {
            if (cartCopy[i].item.id === item.item.id) {
                cartCopy[i].quantity += item.quantity;
                found = true;
                break;
            }
        }

        found ? setCart([...cartCopy]) : setCart([...cart, item]);
    }

    const removeItem = (itemId) => {
        setCart(cart.splice(itemId, 1))
    }

    const getTotal = () => {
        console.log(cart)
        return cart ? cart.reduce((ac, i) => ac + i.quantity, 0) : 0
    }

    const clear = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeItem, getTotal, clear
        }}>
            {children}
        </CartContext.Provider>
    )

}