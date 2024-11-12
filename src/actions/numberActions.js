import clienteAxios from '../config/axios';
import {
    SET_PHONE,
    SET_PHONE_SUCCESS,
    SET_PHONE_FAILED,
    UPDATE_PHONE,
    UPDATE_PHONE_SUCCESS,
    UPDATE_PHONE_FAILED,
    VERIFY_TOKEN,
    VERIFY_TOKEN_SUCCESS,
    VERIFY_TOKEN_FAILED, 
    RESEND_TOKEN,
    RESEND_TOKEN_SUCCESS,
    RESEND_TOKEN_FAILED
} from '../types';

export function setPhoneAction(phone) {
    return async (dispatch) => {
        //Save the data from the component
        const lada = phone.lada;
        const number = phone.number;
        const dataPhone = lada + number
        //Create an object with the data
        const data = {
            "phone": dataPhone
        }
        //We set that the state is loading
        dispatch(setPhone());
        try {
            const response = await clienteAxios.post('setToken', data);
            console.log(response);
            if (response.data.message === "mensaje enviado") {
                dispatch(setPhoneSuccess(response.data.number));
                return true;
            } else {
                dispatch(setPhoneFailed(true));
                return false;
            }
        } catch (error) {
            if (error.response.data.error === "Too many requests"){
                dispatch(setPhoneFailed(true));
                return error.response.data.error;
            }
            if(error.response.data.error === "number already exist"){
                dispatch(setPhoneFailed(true))
                return error.response.data.error;
            }
            if (error.response.data.error === "Campos incompletos"){
                dispatch(setPhoneFailed(true));
                return error.response.data.error;
            }
        }
    }
}
//We set that the state is loading
const setPhone = () => ({
    type: SET_PHONE,
    payload: true
})
//We set that the state is not loading and we save the user data
const setPhoneSuccess = (phone) => ({
    type: SET_PHONE_SUCCESS,
    payload: phone
})
//We set that the state is not loading and we set the error
const setPhoneFailed = (status) => ({
    type: SET_PHONE_FAILED,
    payload: status
})

export function updatePhoneAction(newPhone) {
    return async (dispatch) => {
        //We set that the state is loading
        dispatch(updatePhone());
        try {   
            const phone = newPhone.value;
            //Create an object with the data
            const data = {
                "phone": phone
            }
            const response = await clienteAxios.post('setToken', data)
            if (response.data.message === "mensaje enviado") {
                dispatch(updatePhoneSuccess(response.data));
                return true;
            } else {
                dispatch(updatePhoneFailed(true));
                return false;
            }
        }
        catch (error) {
            console.log(error);
            dispatch(updatePhoneFailed(true))
        }
    }
}

const updatePhone = () => ({
    type: UPDATE_PHONE,
    payload: true
})

const updatePhoneSuccess = (phone) => ({
    type: UPDATE_PHONE_SUCCESS,
    payload: phone
})

const updatePhoneFailed = (status) => ({
    type: UPDATE_PHONE_FAILED,
    payload: status
})

export function verifyTokenAction(data) {
    return async (dispatch) => {
        dispatch(verifyToken());
        try {
            const response = await clienteAxios.post('verifyToken', data)
            if (response.data.message === "token verificado") {
                dispatch(verifyTokenSuccess(response.data.token));
                return true;
            } else {
                if(response.data.message === "token incorrecto"){
                    dispatch(verifyTokenFailed(true));
                    return false;
                }
            }
        } catch (error) {
            console.log(error);
            dispatch(verifyTokenFailed(true))
        }
    }
}

const verifyToken = () => ({
    type: VERIFY_TOKEN,
    payload: true
})

const verifyTokenSuccess = (token) => ({
    type: VERIFY_TOKEN_SUCCESS,
    payload: token
})

const verifyTokenFailed = (status) => ({
    type: VERIFY_TOKEN_FAILED,
    payload: status
})

export function resendTokenAction(phone) {
    return async (dispatch) => {
        dispatch(resendToken());
        try{
            const response = await clienteAxios.post('resendToken', phone);
            if(response.data.message === "mensaje enviado"){
                dispatch(resendTokenSuccess(response.data.token));
                return true;
            }
        }catch(error){
            console.log(error);
            if (error.response.data.message === "Too many requests"){
                dispatch(resendTokenFailed(true));
                return error.response.data.message;
            }
            if (error.response.data.message === "Campos incompletos"){
                dispatch(resendTokenFailed(true));
                return error.response.data.message;
            }
        }
    }
}

const resendToken = () =>({
    type: RESEND_TOKEN,
    payload: true
})

const resendTokenSuccess = (token) => ({
    type: RESEND_TOKEN_SUCCESS,
    payload: token
})

const resendTokenFailed = (status) => ({
    type: RESEND_TOKEN_FAILED,
    payload: status
})