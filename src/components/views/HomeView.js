import React from 'react'
import NavBar from '../NavBar';

export default function HomeView() {

    const categories = [
        {name: "Sillas", link: "https:google.com/sillas"},
        {name: "Escritorios", link: "https:google.com/escritorios"},
        {name: "Accesorios", link: "https:google.com/accesorios"},
    ];

    return (
        <main>
            <NavBar title = "Home Office Store" categories = {categories}></NavBar>
        </main>
    )
}
