// @flow
import * as React from 'react';
import {LogoCompany, LogoCompanySubTitle, LogoCompanyTitle} from "../styled/StyledComponents";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";
import Swal from "sweetalert2";
import errorCatcher from "../utils/errorCatcher";
import {getItem, putData} from "../utils/awsFunctions";

const initialUser = {
    username: '',
    password: '',
}

export function Login() {

    const {signIn, signOut, authUser} = useContext(AuthContext);

    const [user, setUser] = useState(initialUser);

    useEffect(()=>{
        console.log("checking authuser", authUser);
    }, [authUser])

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userLogged = await signIn(user.username, user.password);
            const callbackGetItem = (users) => {
                console.log("data from bd");
                const onSuccessInsertUser = () => {
                    Swal.fire(
                        `Hola ${userLogged.attributes.name}`,
                        'Te damos la bienvenida a Home Office Store!',
                        'success'
                    )
                }
                if(users.length === 0){
                    putData('users', {id: userLogged.attributes.sub, username: userLogged.username,
                        ...userLogged.attributes}, onSuccessInsertUser);
                }
            }
            getItem('users', 'id', userLogged.attributes.sub, callbackGetItem);
            console.log("logged", userLogged);
        } catch (e) {
            console.error("error signIn");
            errorCatcher(e.message);
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <LogoCompany className='d-flex flex-column justify-content-center align-items-center'>
                <LogoCompanyTitle>
                    Home Office
                </LogoCompanyTitle>
                <LogoCompanySubTitle>Store</LogoCompanySubTitle>
            </LogoCompany>
            <br/>
            {!authUser &&
                <div>
                    <h2 className="my-4">Iniciar sesión</h2>

                    <div className='w-100'>
                        <form onSubmit={handleSubmit} className='mx-auto'>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Usuario</label>
                                <input value={user.username} onChange={handleChange} type="text"
                                       className="form-control"
                                       id="username" name='username'/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input value={user.password} onChange={handleChange} type="password"
                                       className="form-control"
                                       id="password" name='password'/>
                            </div>
                            <button type="submit" className="w-100 btn btn-primary">Ingresar</button>
                        </form>
                    </div>
                    <small className="text-muted mt-0 d-flex justify-content-center align-items-center">¿No tienes
                        cuenta?
                        <NavLink
                            className="btn btn-link"
                            to='/signup'
                        >
                            Regístrate
                        </NavLink>
                    </small>
                </div>}
            {authUser &&
                <>
                    <h3>Sesión Iniciada</h3>
                    <pre>
                    <p>
                        {`
                        Usuario: ${authUser.username}
                        Nombre: ${authUser.attributes.name}
                        Correo: ${authUser.attributes.email}
                        Teléfono: ${authUser.attributes.phone_number}`}
                    </p>
                </pre>
                </>}
            {authUser && <small className="my-3 text-muted mt-0 d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        Swal.fire({
                            title: 'Cerrar Sesión',
                            text: "Desea cerrar sesión?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Cerrar Sesión'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                await signOut();
                            }
                        })
                    }}
                >
                    Cerrar sesión
                </button>
            </small>}
            <small className="text-muted mt-0 d-flex justify-content-center align-items-center my-3">¿Necesitas
                confirmar tu
                cuenta?
                <NavLink
                    className="btn btn-link"
                    to='/confirmSignUp'
                >
                    Confirma aquí
                </NavLink>
            </small>
        </div>
    );
}