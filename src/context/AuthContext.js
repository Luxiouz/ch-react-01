import React, {createContext, useContext, useEffect, useState} from "react";
import {Auth} from 'aws-amplify';
import errorCatcher from "../utils/errorCatcher";
import Swal from "sweetalert2";
import {UIContext} from "./UIContext";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const {setLoading} = useContext(UIContext);

    const [authUser, setAuthUser] = useState(null);

    const [status, setStatus] = useState('');

    useEffect( ()=>{
       getAuthUser().then(user => {
           console.log("gettin auth user", user)
           setAuthUser(user)
       });
    }, [status])

   const getAuthUser = async () => {
       try{
           setLoading(true);
           return await Auth.currentAuthenticatedUser();
       } catch (error){
           console.error('error getting auth user', error);
       } finally {
           setLoading(false);
       }
   }

    const signIn = async (username, password) => {
        try {
            setLoading(true);
            const user = await Auth.signIn(username, password);
            setStatus('singIn');
            return user;
        } catch (error) {
            console.error('error signing in', error);
            errorCatcher(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const signUp = async (userData) => {
        try {
            setLoading(true);
            const {user} = await Auth.signUp({...userData});
            console.log("cognito user", user);
            setStatus('singUp');
            return user;
        } catch (error) {
            console.error('error signing up:', error);
            errorCatcher(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function confirmSignUp(username, code) {
        try {
            setLoading(true);
            await Auth.confirmSignUp(username, code);
            setStatus('confirmSignUp');
        } catch (error) {
            console.error('error confirming sign up', error);
            errorCatcher(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function resendConfirmationCode(username) {
        try {
            setLoading(true);
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
            Swal.fire(
                'Código Enviado',
                'Revisa la bandeja de tu correo electrónico',
                'success'
            )
        } catch (err) {
            console.error('error resending code: ', err);
            errorCatcher(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        try {
            setLoading(true);
            await Auth.signOut();
            setStatus('signOut');
            Swal.fire(
                'Te extrañaremos!',
                'La sesión ha sido cerrada!',
                'info'
            )
        } catch (error) {
            console.error('error signing out: ', error);
            errorCatcher(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{signUp, confirmSignUp, signIn, resendConfirmationCode, signOut, authUser}}>
            {children}
        </AuthContext.Provider>
    )
}
