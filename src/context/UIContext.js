import React, { createContext, useState } from 'react'
import Loader from "../shared/components/Loader";

export const UIContext = createContext([]);

export const UIProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    return (
        <UIContext.Provider value={{
            loading, setLoading
        }}>
            {loading && <Loader />}
            {children}
        </UIContext.Provider>
    )

}