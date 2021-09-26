import React from 'react'

export default function NavBar({ title, categories }) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://google.com"><b>{title}</b></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="https://google.comnavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            categories.map(
                                (cat, idx) =>
                                (<li className="nav-item" key={idx}>
                                    <a className="nav-link" href={cat.link}>{cat.name}</a>
                                </li>)

                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
