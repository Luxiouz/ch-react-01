import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getFirestore } from '../../firebase/config';
import LoadingCardList from '../../shared/placeholders/LoadingCardList';
import errorCatcher from '../../utils/errorCatcher';
import ProductItemList from './ItemList';

export default function ProductListContainer({categories}) {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const { categoryId } = useParams()
    useEffect(() => {

        setLoading(true);

        const db = getFirestore();

        setCategory(categories.find(cat => cat.id === categoryId))

        const productCollection = db.collection('products');
        (categoryId? productCollection.where('category' ,'==' , categoryId): productCollection).get().then((response)=>{
            if(response){
                const items = response.docs.map(item => {
                    return {id: item.id ,...item.data()}
                })
                
                setProducts(items);
            }
        }).catch(e => errorCatcher(e)).finally(() => {
            setLoading(false);
        })

    }, [categories, categoryId])

    return (
        <div>

            {(categoryId) ? 
                <>
                    <div className="row">
                        <div className="col-sm-3">
                            <img className="img-fluid img-thumbnail" src={category.photoUrl} style={{ width: '100%' }} alt={category.name} />
                        </div>
                        <div className="col-sm-9">
                            <h1 className="text-capitalize">{category.name}</h1>
                            <p>{category.description}</p>
                        </div>

                    </div>
                    <hr />
                </> : <br></br>
            }
            {
                loading ? <LoadingCardList length="12"></LoadingCardList> :
                    (products && products?.length === 0) ? <h3>No se encontraron productos</h3> : <ProductItemList products={products}></ProductItemList>
            }
        </div>
    )
}
