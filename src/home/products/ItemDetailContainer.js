import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getFirestore } from '../../firebase/config';
import ItemCount from '../../shared/components/ItemCount';
import LoadingCardList from '../../shared/placeholders/LoadingCardList';
import errorCatcher from '../../utils/errorCatcher';

export default function ItemDetailContainer() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(0);
    const { itemId } = useParams();
    const history = useHistory();

    useEffect(() => {

        const db = getFirestore();
        const productCollection = db.collection('products');
        productCollection.doc(itemId).get().then((response) => {
            if (response) {
                setProduct({ id: response.id, ...response.data() });
            }
        }).catch(e => errorCatcher(e)).finally(() => {
            setLoading(false);
        })

    }, [itemId])

    const onAddHandler = (count) => {
        console.log("count", count)
        setCount(count);
    }

    const handleCart = () => {
        history.push('/cart')
    }

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
                        <p className="text-success">Stock: {product.stock}</p>
                        {count <= 0 ?
                            <ItemCount stock={product.stock} onAdd={onAddHandler}></ItemCount> :
                            <>
                                <button className="btn btn-primary text-uppercase btn-add-cart " onClick={handleCart}><i className="bi bi-cart-plus pe-2"></i>Terminar Compra</button>
                                <small className="d-block text-muted text-small">{count} items agregados al carrito</small>    
                            </>}
                    </div>
                </div>
        }</>
    )
}
