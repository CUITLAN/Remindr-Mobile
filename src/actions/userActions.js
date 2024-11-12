//NPM dependencies
import clienteAxios from '../config/axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
//Our dependencies
import {
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILED, 
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    RECOVER_PASSWORD,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../types'

export function createUserAction(user) {
    return async (dispatch) => {
        //We create the user
        dispatch(createUser());
        try {
            //If the user is created successfully
            dispatch(createUserSuccess(user));
        } catch (error) {
            //If the user is not created successfully
            console.log(error);
            dispatch(createUserFailed(true))
        }
    }
}
//We set that the state is loading
const createUser = () => ({
    type: CREATE_USER,
    payload: true
});
//We set that the state is not loading and we save the user data
const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    payload: user
})
//We set that the state is not loading and we set the error
const createUserFailed = (status) => ({
    type: CREATE_USER_FAILED,
    payload: status
})

export function saveUserAction(user) {
    return async (dispatch) => {
        //We save the user in the state
        dispatch(saveUser());
        try {
            //Call the api to save the user in the database
            const response = await clienteAxios.post('saveUser', user);
            if(response.data.message === 'User saved'){
                dispatch(saveUserSuccess(user))
                await AsyncStorage.removeItem('reduxState');
                return true;
            }
        } catch (error) {
            if (error.response.data.message === 'User not saved') {
                dispatch(saveUserFailed(true));
                await AsyncStorage.removeItem('reduxState');
                return error.response.data.message;
            }
            if(error.response.data.message === 'The email is already registered'){
                dispatch(saveUserFailed(true));
                await AsyncStorage.removeItem('reduxState');
                return error.response.data.message;
            }
        }
    }
}
//We set that the state is loading
const saveUser = () => ({
    type: SAVE_USER,
    payload: true
})
//We set that the state is not loading and we save the user data
const saveUserSuccess = (user) => ({
    type: SAVE_USER_SUCCESS,
    payload: user
})
//We set that the state is not loading and we set the error
const saveUserFailed = (status) => ({
    type: SAVE_USER_FAILED,
    payload: status
})

export function loginUserAction(user) {
    return async (dispatch) => {
        dispatch(loginUser());
        try {
            //Call the api to login the user
            const response = await clienteAxios.post('./loggingUser', user);
            //If the user is not found
            if (response.data.message === 'User not found') {
                dispatch(loginUserFailed(true));
                return;
            } else {
                console.log(response.data.message);
                localStorage.setItem('userData', JSON.stringify(response.data.message));
                dispatch(loginUserSuccess(response.data.message));
                //Return true to redirect the user to the home page
                return response.data.user;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
//We set that the state is loading
const loginUser = () => ({
    type: LOGIN_USER,
    payload: true
})
//We set that the state is not loading and we save the user data
const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
})
//We set that the state is not loading and we set the error
const loginUserFailed = (status) => ({
    type: LOGIN_USER_FAILED,
    payload: status
})

export function updateUserAction(updateData) {
    return async (dispatch) => {
        dispatch(updateUser());
        try {
            //Call the api to update the user
            const id = updateData.userId;
            const response = await clienteAxios.patch(`./updateUser/${id}`, updateData);
            //If the user is not found
            if (response.data.message === 'User not found and not updated') {
                dispatch(updateUserFailed(true));
                return false;
            } else {
                //Store the user data in localStorage
                localStorage.setItem('userData', JSON.stringify(response.data));
                dispatch(updateUserSuccess(response.data));
                //Return true to redirect the user to the home page
                return true;
            }
        } catch (error) {
            console.log(error);
            dispatch(loginUserFailed(true));
        }
    }
}

const updateUser = () => ({
    type: EDIT_USER,
    payload: true
})

const updateUserSuccess = (user) => ({
    type: EDIT_USER_SUCCESS,
    payload: user
})

const updateUserFailed = (status) => ({
    type: EDIT_USER_FAILED,
    payload: status
})

export function deleteUserAction (user) {
    return async (dispatch) =>{
        dispatch(deleteUser());
        try{
            const id = user.userId;
            const response = await clienteAxios.delete(`./deleteUser/${id}`);
            if(response.data.message === 'User not found and not deleted'){
                dispatch(deleteUserFailed(true));
                return false;
            }else{
                localStorage.clear();
                sessionStorage.clear();
                dispatch(deleteUserSuccess(response.data));
                return true;
            }
        }catch (error){
            console.log(error);
            dispatch(deleteUserFailed(true));
        }
    }
}

const deleteUser = () =>({
    type: DELETE_USER,
    payload:true
})

const deleteUserSuccess = (user) =>({
    type: DELETE_USER_SUCCESS,
    payload: user
})

const deleteUserFailed = (status) => ({
    type: DELETE_USER_FAILED,
    payload: status
})

export function RecoverPasswordAction(data) {
    return async (dispatch) => {
        dispatch(recoverPassword());
        try {
            const response = await clienteAxios.post('./recoverPassword', data);
            if(response.data.message === 'Email sent'){
                dispatch(recoverPasswordSuccess(response.data.message));
                return response.data.message;
            }
        } catch (error) {
            console.log(error);
            if(error.response.data.error === 'Email not found'){
                dispatch(recoverPasswordFailed(true));
                return error.response.data.error;
            }
            if(error.response.data.error === 'Error sending the email'){
                dispatch(recoverPasswordFailed(true));
                return error.response.data.message;
            }
            if(error.response.data.error === 'Recovery token already set'){
                dispatch(recoverPasswordFailed(true));
                return error.response.data.error;
            }
        }
    }
}

const recoverPassword = () => ({
    type: RECOVER_PASSWORD,
    payload: true
})

const recoverPasswordSuccess = (user) => ({
    type: RECOVER_PASSWORD_SUCCESS,
    payload: user
})

const recoverPasswordFailed = (status) => ({
    type: RECOVER_PASSWORD_FAILED,
    payload: status
})

export function ResetPasswordAction(data) {
    return async (dispatch) => {
        dispatch(resetPassword());
        try {
            const response = await clienteAxios.patch('./changePassword', data);
            if(response.data.message === 'Password changed'){
                dispatch(resetPasswordSuccess(response.data.message));
                return response.data.message;
            }
        } catch (error) {
            console.log(error);
            if(error.response.data.error === 'Token not found'){
                dispatch(resetPasswordFailed(true));
                return error.response.data.error;
            }
            if(error.response.data.error === 'User not found'){
                dispatch(resetPasswordFailed(true));
                return error.response.data.error;
            }
            if(error.response.data.error === 'Campos incompletos'){
                dispatch(resetPasswordFailed(true));
                return error.response.data.error;
            }
        }
    }
}

const resetPassword = () => ({
    type: RESET_PASSWORD,
    payload: true
})

const resetPasswordSuccess = (user) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: user
})

const resetPasswordFailed = (status) => ({
    type: RESET_PASSWORD_FAILED,
    payload: status
})