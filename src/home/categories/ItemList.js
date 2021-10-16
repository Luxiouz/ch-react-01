import React from 'react'
import CategoryItem from './Item'

export default function CategoryList({ categories }) {
    return (
        <div className="row flex-wrap justify-content-between align-content-center">
            {
                categories.map(c => (
                    <CategoryItem category={c} key={c.id} />
                ))
            }
        </div>
    )
}
