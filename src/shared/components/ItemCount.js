import React, { useEffect, useState } from 'react'

export default function ItemCount({value, stock, onAdd, cartMode, onUpdate, onRemove}) {
    const [count, setCount] = useState(value || 1);

    useEffect(() => {
        if(count<1) setCount('')
        else if(count>stock) setCount(stock)
        else setCount(count)
    }, [count, stock])

    const onChangeCount = (e) => {
        setCount(e.target.value);
    }

    const onIncrement = () => {
        if (Number(count) < stock) {
            setCount(Number(count) + 1);
        }

    }

    const onDecrement = () => {
        if (Number(count) > 1) {
            setCount(Number(count) - 1);
        }
    }

    const handleClick = () => {
        onAdd(count)
    }

    return (
        <div>
            <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
                    <button disabled={count<=1} type="button" className="btn btn-outline-secondary" onClick={onDecrement}>-</button>
                    <input value={count} onChange={onChangeCount} style={{maxWidth: '7rem'}} type="number" name="input-count" className="input-count form-control" placeholder="Cantidad" aria-label="Input for quantity" aria-describedby="Text input for quantity" />
                    <button disabled={count>=stock} type="button" className="btn btn-outline-secondary" onClick={onIncrement}>+</button>
                </div>
            </div>
            
            { !cartMode ? <button className="btn btn-success text-uppercase btn-add-cart " onClick={handleClick}><i className="bi bi-cart-plus pe-2"></i>Agregar al carrito</button> :
            <>
            <button className="btn btn-secondary btn-add-cart " onClick={()=>{onUpdate(count)}}>Actualizar Cantidad</button>
            <button className="ms-2 btn btn-danger btn-add-cart " onClick={onRemove}>Eliminar</button>
            </>}
        </div>
    )
}
