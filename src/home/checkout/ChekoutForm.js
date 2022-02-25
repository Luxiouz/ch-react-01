import React, {useContext, useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import { Customer } from '../../models/customer';
import {AuthContext} from "../../context/AuthContext";

export default function ChekoutForm({ loading, handleSubmit }) {

    const {authUser} = useContext(AuthContext);

    const [customer, setCustomer] = useState(new Customer('', '', '', '', '', ''))

    const [checkTerms, setCheckTerms] = useState(false);

    useEffect(()=>{
        console.log("authuser", authUser)
        if(authUser) setCustomer(new Customer(authUser.attributes.name, authUser.name, authUser.attributes.email, authUser.attributes.phone_number, authUser.attributes.address, ''));
    }, [authUser])

    const onCustomerChange = (event) => {
        const customerData = { ...customer, [event.target.name]: event.target.value }
        setCustomer(customerData);
    }

    const onCheckTermsChange = (event) => {
        setCheckTerms(event.target.checked)
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (!checkTerms) return;
        if (!validateFields()) return;
        else handleSubmit(customer);
    }

    const getSpanishProperty = (key) => {
        if (key === 'name') { return 'name' }
        else if (key === 'lastName') { return 'apellido' }
        else if (key === 'mail') { return 'correo' }
        else if (key === 'phone') { return 'celular' }
        else if (key === 'address') { return 'dirección' }
        else if (key === 'reference') { return 'referencia' }
        else return key;
    }

    const validateFields = () => {
        let valid = 0;

        for (let key in customer) {
            if (key !== 'reference') {
                if (customer[key].length < 3) {
                    valid++;
                    Swal.fire(
                        'Atención!',
                        `El campo ${getSpanishProperty(key)} esta vacío o debe tener mínimo 3 caracteres`,
                        'warning'
                    )
                }
            }
        }
        return valid === 0;
    }

    return (
        <>
            {loading ? (<h3>Cargando ....</h3>) : (
                <form onSubmit={onSubmitForm}>
                    <div className="mb-3 d-flex align-items-center row">
                        <div className="mb-3 col-sm-6">
                            <label htmlFor="exampleInputName" className="form-label me-2"><small>Nombre</small></label>
                            <input disabled name="name" type="text" className="form-control" id="exampleInputName" required value={customer.name} onChange={onCustomerChange} />
                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center row">
                        <div className="mb-3 col-sm-6">
                            <label htmlFor="exampleInputEmail1" className="form-label me-2"><small>Correo</small></label>
                            <input disabled name="mail" type="email" className="form-control me-2" id="exampleInputEmail1" required value={customer.mail} onChange={onCustomerChange} />
                        </div>
                        <div className="mb-3 col-sm-6">
                            <label htmlFor="exampleInputPhone" className="form-label me-2"><small>Celular</small></label>
                            <input disabled name="phone" type="tel" className="form-control me-2" id="exampleInputPhone" required value={customer.phone} onChange={onCustomerChange} />
                        </div>
                    </div>

                    <div className="mb-3 d-flex align-items-center row">
                        <div className="mb-3 col-md-6">
                            <label htmlFor="exampleInputAddress" className="form-label me-2"><small>Dirección</small></label>
                            <input name="address" type="text" className="form-control" id="exampleInputAddress" required value={customer.address} onChange={onCustomerChange} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="exampleInputReference" className="form-label col-3 me-2"><small>Referencia</small></label>
                            <input name="reference" type="text" className="form-control" id="exampleInputReference" required value={customer.reference} onChange={onCustomerChange} />
                        </div>
                    </div>


                    <div className="mb-3">
                        <input name="checkTerms" type="checkbox" className="form-check-input me-2" id="termsCheck" required value={checkTerms} onChange={onCheckTermsChange} />
                        <label className="form-check-label" htmlFor="termsCheck">Acepto todos los <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">términos y condiciones</a></label>
                    </div>
                    <button disabled={loading} type="submit" className="btn btn-primary button-large">{loading ? 'Procesando...' : 'Comprar'}</button>
                </form>)}
        </>
    )

}
