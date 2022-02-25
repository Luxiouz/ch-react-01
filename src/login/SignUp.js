import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext, AuthProvider} from "../context/AuthContext";
import {NavLink, useHistory} from "react-router-dom";
import Swal from "sweetalert2";

const initialUser = {
    username: '',
    password: '',
    password2: '',
    code: '',
    attributes: {
        email: '',
        phone_number: '',
        gender: '',
        address: '',
        name: '',
        birthdate: '',
    },
    terms: false,
};

const initialCreatedUser = {
    user: '',
    userConfirmed: '',
    userSub: '',
}

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/
const urlTerms = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const datePattern = '^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\\d\\d$';

export default function SignUp() {
    const {signUp, confirmSignUp} = useContext(AuthContext);

    const [user, setUser] = useState(initialUser);
    const [userCreated, setUserCreated] = useState(initialCreatedUser);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (!Object.is(user, initialUser)) {
            if (!user.password.match(passwordPattern)) setErrorMessage(
                'La contraseña debe tener mínimo 8 caracteres, tener al menos un caracter especial y contener' +
                ' minúsculas, mayúsculas y números.')
            else if (user.password !== user.password2) setErrorMessage('Las contraseñas no coinciden')
            else setErrorMessage('');
        }
    }, [user])

    const handleSubmit = useCallback(async (e) => {
        console.log("submit", e.target)
        e.preventDefault();
        console.log("form", user)
        if (user.password && user.password === user.password2) {

            const userSubmit = {...user};
            delete userSubmit.password2;
            delete userSubmit.terms;
            delete userSubmit.code;

            try {
                const userCreated = await signUp({...userSubmit});
                console.log("userCreatedJson", userCreated);
                setUserCreated(userCreated);
                setUser(initialUser);
                setErrorMessage('');
                if (!userCreated.userConfirmed) {
                    history.push({
                        pathname: '/confirmSignUp',
                        search: `?username=${userCreated.username}`,
                    });
                } else {
                    Swal.fire({
                        title: 'Usuario creado',
                        text: "El usuario ha sido creado con éxito. Proceda a iniciar sesión.",
                        icon: 'success',
                        showCancelButton: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push('/login');
                        }
                    })
                }


            } catch (e) {
                console.log("error", e)
                setErrorMessage(e.message);
            }
        }
    }, [user, signUp])

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
            <div className='m-3'>
                <h2>Crear Usuario</h2>
                <div className='row justify-content-around align-items-center'>
                        <form className='col-12 col-md-6' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de usuario</label>
                            <input type="text" className="form-control" id="username" name='username'
                                   value={user.username} onChange={handleChangeUser} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombres y apellidos</label>
                            <input type="text" className="form-control" id="name" name='name'
                                   value={user.attributes.name} onChange={handleChangeAttrs} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label">Fecha de nacimiento</label>
                            <input type="date" pattern={datePattern} className="form-control" id="birthdate"
                                   name='birthdate' value={user.attributes.birthdate} onChange={handleChangeAttrs}
                                   required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" name='email'
                                   aria-describedby="emailHelp"
                                   value={user.attributes.email} onChange={handleChangeAttrs} required/>
                            <div id="emailHelp" className="form-text">No compartiremos tu email con nadie.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">Teléfono</label>
                            <input type="tel" className="form-control" id="phone_number" name='phone_number'
                                   aria-describedby="phoneHelp"
                                   value={user.attributes.phone_number} onChange={handleChangeAttrs} required/>
                            <div id="phoneHelp" className="form-text text-warning">
                                Formato de teléfono debe coincidor con +xxxxxxxxxxx. Ejemplo: +51987654321
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="address" name='address'
                                   value={user.attributes.address} onChange={handleChangeAttrs} required/>
                        </div>
                        <p className='m-0 p-0'>Género</p>
                        <div className="mb-3 form-check" onChange={handleChangeAttrs}>
                            <input type="radio" className="form-check-input" id="genderM" name='gender' value='male'
                                   required/>
                            <label className="form-check-label" htmlFor="genderM">Masculino</label>
                            <br/>
                            <input type="radio" className="form-check-input" id="genderF" name='gender' value='female'
                                   required/>
                            <label className="form-check-label" htmlFor="genderF">Femenino</label>
                            <br/>
                            <input type="radio" className="form-check-input" id="genderN" name='gender' value='no-spec'
                                   required/>
                            <label className="form-check-label" htmlFor="genderN">No especificar</label>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" name='password'
                                   value={user.password} onChange={handleChangeUser}
                                   required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="password2" name='password2'
                                   value={user.password2} onChange={handleChangeUser}
                                   required/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="terms" name='terms'
                                   checked={user.terms} onChange={handleChangeUser} required/>
                            <label className="form-check-label" htmlFor="terms">Acepto <a href={urlTerms}>Términos
                                y
                                condiciones</a> </label>
                        </div>
                        {errorMessage && <div className='text-danger my-3'>{errorMessage}</div>}
                        <button disabled={!!errorMessage} type="submit"
                                className={!errorMessage ? 'btn btn-primary' : 'btn btn-secondary'}>Crear
                        </button>
                        <small className="text-muted mt-0 d-flex align-items-center">¿Ya tienes una cuenta?
                            <NavLink
                                className="btn btn-link"
                                to='/login'
                            >
                                Inicia sesión
                            </NavLink>
                        </small>
                    </form>
                    <div className='d-none d-md-block col-md-6 text-center'>
                        <img src="../../assets/logo.jpg" alt="logo"/>
                    </div>
                </div>
            </div>
        </>
    );
}
