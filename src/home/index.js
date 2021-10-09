import React from 'react'
import NavBar from '../shared/components/NavBar.js';
import Categories from './categories/index.js';

export default function Home() {

    const categories = [
        {name: "Sillas", link: "https:google.com/sillas"},
        {name: "Escritorios", link: "https:google.com/escritorios"},
        {name: "Accesorios", link: "https:google.com/accesorios"},
    ];

    return (
        <main className='container p-0'>
            <NavBar title = "Home Office Store" categories = {categories}></NavBar>
            <Categories></Categories>
        </main>
    )
}
