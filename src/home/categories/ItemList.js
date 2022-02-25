import React from 'react'
import CategoryItem from './Item'

export default function CategoryList({ categories }) {
    return (
        <>
            <section id="home">
                <img className="w-100 border-radius-1 mb-2" 
                src={"https://firebasestorage.googleapis.com/v0/b/home-office-coder-react.appspot.com/o/banner1.jpeg?alt=media&token=8af74e5b-f064-48cc-bdd3-863b97ce4357"}
                alt={"banner"}/>
                <h1 className="text-center my-4">El Home Office llegó para quedarse</h1>
                <div className="my-2 text-center text-secondary">
                    <p>Busca una categoría y encuentra el producto que necesitas</p>
                </div>
            </section>
            <div className="row flex-wrap justify-content-between align-content-center">
                {
                    categories.map(c => (
                        <CategoryItem category={c} key={c.id} />
                    ))
                }
            </div>
        </>
    )
}
