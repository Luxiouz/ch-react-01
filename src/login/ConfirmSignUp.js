import React, { useContext, useEffect, useState} from 'react';
import {useLocation, useSearchParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import errorCatcher from "../utils/errorCatcher";
import Swal from "sweetalert2";

const initialUser = {
    username: '',
    code: '',
}

export default function ConfirmSignUp() {
    const {confirmSignUp, resendConfirmationCode} = useContext(AuthContext);

    const [user, setUser] = useState(initialUser);
    const useQuery = () => new URLSearchParams(useLocation().search);
    const history = useHistory();
    const query = useQuery();

    useEffect(() => {
       const usernameParam = query.get('username');
       if(usernameParam) setUser({...user, username: usernameParam});
    }, [])

    const resendCode = (e) => {
        e.preventDefault();
        if(user.username) resendConfirmationCode(user.username);
        else {
            errorCatcher('Especifica un nombre de usuario para enviar el código.')
        }
    }

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();
        console.log("handleConfirmSubmit");
       confirmSignUp(user.username, user.code).then( response => {
           Swal.fire({
               title: 'Confirmación Exitosa',
               text: "Termine de activar su cuenta iniciando sesión.",
               icon: 'success',
               showCancelButton: false,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Iniciar Sesión'
           }).then(async (result) => {
               if (result.isConfirmed) {
                   console.log("handleConfirmSubmit", response);
                   history.push('/login');
               }
           })

       })

    }

    const handleChangeUser = (e) => {
        console.log("handleChangeUser", e.target.name);
        setUser({...user, [e.target.name]: e.target.value})

    }

    const handleChangeAttrs = (e) => {
        console.log("handleChange", e.target.name);
        const attributes = {...user.attributes, [e.target.name]: e.target.value};
        setUser({...user, attributes})
    }

    return (
        <>
            <div className='m-3 text-center'>
                <div className='my-3'>
                    <h2>Confirmar correo electrónico</h2>
                    <small>Se ha enviado un código de verificación al correo electrónico. <br/> Es necesario enviar el código
                        para crear la cuenta.</small>
                </div>
                <div className='row justify-content-around align-items-center'>
                    <form onSubmit={handleConfirmSubmit} className='col-md-4 mx-auto'>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de usuario</label>
                            <input value={user.username} onChange={handleChangeUser} type="text"
                                   className="form-control"
                                   id="username" name='username' required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Código de confirmación</label>
                            <input value={user.code} onChange={handleChangeUser} type="text"
                                   className="form-control"
                                   id="code" name='code'/>
                        </div>
                        <button type="submit"
                                className="w-100 btn btn-primary">Confirmar
                        </button>
                    </form>
                    <small className="text-muted mt-0 d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-link"
                            onClick={resendCode}
                        >
                            Reenviar Código
                        </button>
                    </small>
                </div>
            </div>
        </>
    );
}
