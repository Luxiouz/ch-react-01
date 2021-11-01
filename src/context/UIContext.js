import React, { createContext } from 'react'

export const UIContext = createContext([]);

export const CartProvider = ({ children }) => {

    const [loading, setLoading] = (false);

    return (
        <UIContext.Provider value={{
            loading, setLoading
        }}>
            {children}
        </UIContext.Provider>
    )

}