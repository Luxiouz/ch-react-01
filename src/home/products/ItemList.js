import React from 'react'
import ProductItem from './Item'

export default function ProductItemList({products}) {
    return (
        <div className="row flex-wrap justify-content-start align-content-center">
            {
                products.map(p => (
                    <ProductItem product={p} key={p.id} />
                ))
            }
        </div>
    )
}
