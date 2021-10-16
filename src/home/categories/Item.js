import React from 'react'
import { NavLink } from 'react-router-dom'

export default function CategoryItem({ category }) {
    return (
        <div className="col-sm-4 col-md-3 col-lg-2 py-3" style={{ minWidth: '18rem' , alignSelf: 'center'}}>
            <div className="card p-0">
                <img src={category.photoUrl} className="card-img-top" alt={category.name} />
                <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text" style={{ fontSize: '1rem' }}>{category.description}</p>
                    <NavLink className="text-white text-decoration-none" to={`/category/${category.id}`}><button className="btn btn-primary">ver productos</button></NavLink>
                </div>
            </div>
        </div>
    )
}
