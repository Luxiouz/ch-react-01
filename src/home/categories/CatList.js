import React from 'react'
import CatItem from './CatItem'

export default function CatList({ categories }) {
    return (
        <div className="row justify-content-between flex-wrap">
            {
                categories.map((c, i) => (
                    <CatItem category={c} key={i} />
                ))
            }
        </div>
    )
}
