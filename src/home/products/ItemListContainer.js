import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import LoadingCardList from '../../shared/placeholders/LoadingCardList';
import { getProducts } from '../../utils/dataSource';
import errorCatcher from '../../utils/errorCatcher';
import ProductItemList from './ItemList';

export default function ProductListContainer() {

    const [loading, setLoading] = useState(true)
    const [categoryObj, setCategoryObj] = useState({});
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams()
    useEffect(() => {

        /*
        switch (category) {
            case 'sillas':
                categoryId = 'cat-chair';
                break;
            case 'escritorios':
                categoryId = 'cat-desktop';
                break;
            case 'accesorios':
                categoryId = 'cat-accesory';
                break;
            default:
                categoryId = '';
        }

        console.log("categorid", categoryId)
        */
        setLoading(true);

        getProducts(categoryId).then(result => {
            console.log("cat2", categoryId, "cat3", result)
            result.category && setCategoryObj(result.category);
            result.products && setProducts(result.products);
        }, error => { errorCatcher(error) }).finally(() => { setLoading(false) });
    }, [categoryId])

    return (
        <div>

            {loading ? <br></br> :
                <>
                    <div className="row">
                        <div className="col-sm-3">
                            <img className="img-fluid img-thumbnail" src={categoryObj.photoUrl} style={{ width: '100%' }} alt={categoryObj.name} />
                        </div>
                        <div className="col-sm-9">
                            <h1 className="text-capitalize">{categoryObj.name}</h1>
                            <p>{categoryObj.description}</p>
                        </div>

                    </div>
                    <hr />
                </>
            }
            {
                loading ? <LoadingCardList length="12"></LoadingCardList> :
                    (products && products?.length === 0) ? <h3>No se encontraron productos</h3> : <ProductItemList products={products}></ProductItemList>
            }
        </div>
    )
}
