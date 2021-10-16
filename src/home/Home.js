import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from '../shared/components/NavBar.js';
import { getCategories } from '../utils/dataSource.js';
import errorCatcher from '../utils/errorCatcher.js';
import CategoryContainer from './categories/ItemListContainer.js';
import ItemDetailContainer from './products/ItemDetailContainer.js';
import ProductListContainer from './products/ItemListContainer.js';

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(r => setCategories(r)).catch(error => { errorCatcher(error) }).finally(() => { setLoading(false) })
    }, []);

    return (
        <BrowserRouter>
            <main className='container p-0'>
                {
                    loading ? <p>cargando...</p> : <NavBar title="Home Office Store" categories={categories}></NavBar>
                }

                <Switch>
                    <Route exact path="/">
                        <CategoryContainer></CategoryContainer>
                    </Route>
                    <Route exact path="/category/:categoryId">
                        <ProductListContainer></ProductListContainer>
                    </Route>
                    <Route exact path="/item/:itemId">
                        <ItemDetailContainer></ItemDetailContainer>
                    </Route>
                    <Route path="/">
                        <CategoryContainer></CategoryContainer>
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    )
}
