import React, { useContext } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import ItemCount from '../../shared/components/ItemCount'

export default function Cart() {

    const { cart, addToCart, removeItem, getTotalAmount } = useContext(CartContext)

    return (
        <div>
            { cart.length === 0 && <Redirect to='/' /> }
            <ul className="list-group">
                {cart.map(item => (
                    <li className="list-group-item d-flex justify-content-between align-items-start" key={item.item.id}>
                        <div className="mx-2">
                            <img height="120px" src={item.item.photoUrl} alt={item.item.name}/>
                        </div>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold mb-2">{item.item.name}</div>            
                            <ItemCount stock={item.item.stock} value={item.quantity} cartMode={true} 
                            onUpdate={(count)=>{item.quantity = count; addToCart(item)}} onRemove={()=>{removeItem(item.item.id)}}></ItemCount>
                        </div>
                        <div className="mx-2">
                            <p>S/. {item.item.price} x {item.quantity} = <span className="badge bg-primary rounded-pill" style={{fontSize:"1rem"}}>S/. {item.item.price*item.quantity}</span></p>
                        </div>
                        
                    </li>
                ))}
                 <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold mb-2">Total del Carrito </div>            
                        </div>
                        <div className="mx-2">
                            <p><span className="badge bg-primary rounded-pill" style={{fontSize:"1rem"}}>S/. {getTotalAmount()}</span></p>
                        </div>
                        
                    </li>
            </ul>

            <div className="text-end">
            <NavLink to="/checkout" className="ms-2 my-4 btn btn-success btn-add-cart">Ir a Checkout</NavLink>
            </div>
            
        </div>
    )
}
