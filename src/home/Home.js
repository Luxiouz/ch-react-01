import React, {useEffect, useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {CartProvider} from '../context/CartContext.js';
import {UIProvider} from '../context/UIContext.js';
import {getFirestore} from '../firebase/config.js';
import Footer from '../shared/components/Footer.js';
import NavBar from '../shared/components/NavBar.js';
import LoadingCardList from '../shared/placeholders/LoadingCardList.js';
import errorCatcher from '../utils/errorCatcher.js';
import Cart from './cart/Cart.js';
import CategoryContainer from './categories/ItemListContainer.js';
import Checkout from './checkout/Checkout.js';
import ItemDetailContainer from './products/ItemDetailContainer.js';
import ProductListContainer from './products/ItemListContainer.js';
import {Login} from "../login/Login";
import SignUp from "../login/SignUp";
import ConfirmSignUp from "../login/ConfirmSignUp";
import {AuthProvider} from "../context/AuthContext";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const categoryCollection = db.collection('categories');
        categoryCollection.get().then((response) => {
            if (response) {
                const items = response.docs.map(item => {
                    return {id: item.id, ...item.data()}
                })
                setCategories(items);
            }
        }).catch(e => errorCatcher(e)).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <UIProvider>
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <div className="d-flex flex-column justify-content-between min-vh-100">
                            {
                                loading ? <>
                                        <NavBar title="Home Office Store"/>
                                        <main className='container'>
                                            <LoadingCardList length="12"/>
                                        </main>
                                    </> :

                                    <>
                                        <NavBar title="Home Office Store" categories={categories}/>
                                        <main className='container'>
                                            <Switch>
                                                <Route exact path="/">
                                                    <CategoryContainer loading={loading}
                                                                       categories={categories}/>
                                                </Route>
                                                <Route exact path="/products">
                                                    <ProductListContainer
                                                        categories={categories}/>
                                                </Route>
                                                <Route exact path="/category/:categoryId">
                                                    <ProductListContainer
                                                        categories={categories}/>
                                                </Route>
                                                <Route exact path="/item/:itemId">
                                                    <ItemDetailContainer categories={categories}/>
                                                </Route>
                                                <Route exact path="/cart">
                                                    <Cart categories={categories}/>
                                                </Route>
                                                <Route exact path="/login">
                                                    <Login/>
                                                </Route>
                                                <Route exact path="/signup">
                                                    <SignUp/>
                                                </Route>
                                                <Route exact path="/confirmSignUp">
                                                    <ConfirmSignUp/>
                                                </Route>
                                                <Route exact path="/checkout">
                                                    <Checkout/>
                                                </Route>
                                                <Route path="/">
                                                    <CategoryContainer categories={categories}/>
                                                </Route>
                                            </Switch>
                                        </main>
                                        <Footer/>
                                    </>
                            }
                        </div>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </UIProvider>
    )
}
