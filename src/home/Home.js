import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartProvider } from '../context/CartContext.js';
import { UIProvider } from '../context/UIContext.js';
import { getFirestore } from '../firebase/config.js';
import Footer from '../shared/components/Footer.js';
import NavBar from '../shared/components/NavBar.js';
import LoadingCardList from '../shared/placeholders/LoadingCardList.js';
import errorCatcher from '../utils/errorCatcher.js';
import Cart from './cart/Cart.js';
import CategoryContainer from './categories/ItemListContainer.js';
import Checkout from './checkout/Checkout.js';
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
        <UIProvider>
            <CartProvider>
                <BrowserRouter>
                    <div className="d-flex flex-column justify-content-between min-vh-100">
                    {
                        loading ? <>
                            <NavBar title="Home Office Store"></NavBar>
                            <main className='container'>
                                <LoadingCardList length="12" />
                            </main>
                        </> :

                            <>
                                <NavBar title="Home Office Store" categories={categories}></NavBar>
                                <main className='container'>
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
                                        <Route exact path="/checkout">
                                            <Checkout></Checkout>
                                        </Route>
                                        <Route path="/">
                                            <CategoryContainer categories={categories}></CategoryContainer>
                                        </Route>
                                    </Switch>
                                </main>
                                <Footer></Footer>
                            </>
                    }
                    </div>
                </BrowserRouter>
            </CartProvider>
        </UIProvider>
    )
}
