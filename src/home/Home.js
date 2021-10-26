import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartContext, CartProvider } from '../context/CartContext.js';
import { getFirestore } from '../firebase/config.js';
import NavBar from '../shared/components/NavBar.js';
import LoadingCardList from '../shared/placeholders/LoadingCardList.js';
import errorCatcher from '../utils/errorCatcher.js';
import Cart from './cart/Cart.js';
import CategoryContainer from './categories/ItemListContainer.js';
import ItemDetailContainer from './products/ItemDetailContainer.js';
import ProductListContainer from './products/ItemListContainer.js';

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const categoryCollection = db.collection('categories');
        categoryCollection.get().then((response) => {
            if (response) {
                const items = response.docs.map(item => {
                    return { id: item.id, ...item.data() }
                })
                setCategories(items);
            }
        }).catch(e => errorCatcher(e)).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <CartProvider>
            <BrowserRouter>
                <main className='container p-0'>
                    {
                        loading ? <><NavBar title="Home Office Store"></NavBar><LoadingCardList length="12" /></> :

                            <>
                                <NavBar title="Home Office Store" categories={categories}></NavBar>
                                <Switch>
                                    <Route exact path="/">
                                        <CategoryContainer loading={loading} categories={categories}></CategoryContainer>
                                    </Route>
                                    <Route exact path="/products">
                                        <ProductListContainer categories={categories}></ProductListContainer>
                                    </Route>
                                    <Route exact path="/category/:categoryId">
                                        <ProductListContainer categories={categories}></ProductListContainer>
                                    </Route>
                                    <Route exact path="/item/:itemId">
                                        <ItemDetailContainer categories={categories}></ItemDetailContainer>
                                    </Route>
                                    <Route exact path="/cart">
                                        <Cart categories={categories}></Cart>
                                    </Route>
                                    <Route path="/">
                                        <CategoryContainer categories={categories}></CategoryContainer>
                                    </Route>
                                </Switch>
                            </>
                    }
                </main>
            </BrowserRouter>
        </CartProvider>
    )
}
