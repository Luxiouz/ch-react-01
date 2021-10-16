import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar({ title, categories }) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><b>{title}</b></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                        {
                            categories.map(
                                cat =>
                                (<li className="nav-item" key={cat.id}>
                                    <NavLink activeClassName="badge bg-primary text-wrap text-white" className="nav-link" to={`/category/${cat.id}`}>{cat.name}</NavLink>
                                </li>)
                            )
                        }
                        
                    </ul>
                    <NavLink to="/cart" className="nav-link text-decoration-none text-secondary"><i className="cart-icon bi bi-cart3"></i></NavLink>
                </div>
            </div>
        </nav>
    )
}
