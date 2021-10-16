import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ProductItem({product}) {
    return (
        <div className="col-sm-4 col-md-3 col-lg-2 py-3" style={{ minWidth: '18rem' , alignSelf: 'center'}}>
            <div className="card p-0">
                <img src={product.photoUrl} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text" style={{ fontSize: '1rem' }}>{product.description}</p>
                    <p><b>S/. {product.price}</b></p>
                    <NavLink to={`/item/${product.id}`} className="text-white text-decoration-none"><button className="btn btn-primary">ver más</button></NavLink>
                </div>
            </div>
        </div>
    )
}
