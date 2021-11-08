import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { CartContext } from '../../context/CartContext';
import CheckoutForm from './ChekoutForm';
import { UIContext } from '../../context/UIContext';
import Swal from 'sweetalert2';
import addOrder from '../../firebase/addOrder';

export default function Checkout() {

    const { loading, setLoading } = useContext(UIContext);
    const { cart, getTotal, clearCart, getTotalAmount } = useContext(CartContext);


    const handleSubmit = async (customer) => {

        setLoading(true);

        if (loading) return;

        try {
            addOrder(customer, cart, getTotal()).then(
                res => {
                    Swal.fire({
                        title: 'Pedido Registrado!',
                        html: `<p style="text-align: left;">Número de pedido: <p>

                        <h3>${res}</h3>
                        
                        <small style="text-align: left;">Con el número de pedido puede hacer el seguimiento en:&nbsp;<a href="https://youtu.be/dQw4w9WgXcQ">seguimiento</small>`,
                        icon: 'success',
                        // willClose: () => { clearCart() }
                    })
                    // We have to be sure to clear the cart, even if the user remove swal element from dev tools.
                    clearCart();
                }
            ).catch(error => {
                Swal.fire(
                    'Hay Items sin Stock',
                    `Vuelva a revisar el stock de: ${error.map(item => item.name)}`,
                    'warning'
                )
            }).finally(() => {
                setLoading(false);
            })
        } catch (error) {
            Swal.fire(
                'Ha ocurrido un error!',
                'Detalle del error: ' + JSON.stringify(error),
                'error'
            )
        }

    }

    return (
        <>
            { cart.length === 0 && <Redirect to='/' /> }
            <h1 className="text-center my-5">Total a pagar: S/. {getTotalAmount()}</h1>
            <p className="text-success">Llene el formuario para efectuar la compra</p>
            <CheckoutForm loading={loading} handleSubmit={handleSubmit}></CheckoutForm>
        </>
    )

}
