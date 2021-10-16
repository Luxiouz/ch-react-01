import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LoadingCardList from '../../shared/placeholders/LoadingCardList';
import { getProductById } from '../../utils/dataSource';
import errorCatcher from '../../utils/errorCatcher';

export default function ItemDetailContainer() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const { itemId } = useParams();

    useEffect(() => {
        getProductById(itemId).then(r => { setProduct(r) }).catch(error => { errorCatcher(error) }).finally(() => {
            setLoading(false);
        })

    }, [itemId])

    return (
        <>{
            loading ? <LoadingCardList length="1"></LoadingCardList> :
                <div className="row justify-content-between mt-4">
                    <div className="col-md-6">
                        <img className="img-fluid" src={product.photoUrl} style={{ width: '100%' }} alt={product.name} />
                        <div>
                            <h4>Detalles</h4>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-primary text-success title-item-detail mb-3">{product.name}</h1>
                        <p className="text-secondary">PID-{product.id}</p>
                        <h3 className="mb-3 text-item-price">S/. {product.price}</h3>
                        <button className="btn btn-success text-uppercase btn-add-cart "><i className="bi bi-cart-plus pe-2"></i>Agregar al carrito</button>
                    </div>
                </div>
        }</>
    )
}
