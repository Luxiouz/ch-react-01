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

    const customer = {
        name: '',
        lastName: '',
        mail: '',
        phone: '',
        address: '',
        reference: '',
    }

    const getSpanishProperty = (key) => {
        if (key === 'name') { return 'name' }
        else if (key === 'name') { return 'apellido' }
        else return key;
    }

    const validateFields = () => {
        let valid = 0;

        for (let key in customer) {
            if (key !== 'reference') {
                if (customer[key].length < 3) {
                    valid++;
                    Swal.fire(
                        'Good job!',
                        `El campo ${getSpanishProperty(key)} esta vacío o debe tener mínimo 3 caracteres`,
                        'warning'
                    )
                }
            }
        }
        return valid === 0;
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (loading) return;

        // TODO add validations
        if (!validateFields()) return;

        try {
            addOrder(customer, cart, getTotal()).then(
                res => {
                    Swal.fire({
                        title: 'Orden Registrada!',
                        text: `Número de orden registrado: ${res}`,
                        icon: 'success',
                        willClose: () => { clearCart() }
                    })
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
            <CheckoutForm loading={loading} customer={customer} handleSubmit={handleSubmit}></CheckoutForm>
        </>
    )

}
