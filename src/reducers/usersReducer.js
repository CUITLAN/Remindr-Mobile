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

const initialState = {
    users: [],   // Inicialmente vacía
    error: null,
    loading: false
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                loading: action.payload
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload // Reemplaza usuarios completamente si creas uno nuevo
            };
        case CREATE_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SAVE_USER:
            return {
                ...state,
                loading: action.payload
            };
        case SAVE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload // Reemplaza con el usuario guardado
            };
        case SAVE_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGIN_USER:
            return {
                ...state,
                loading: action.payload
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload // Reemplaza la lista de usuarios con el usuario logueado
            };
        case LOGIN_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case EDIT_USER:
            return {
                ...state,
                loading: action.payload
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                // Actualiza el usuario en base a su ID, o reemplaza si es único
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            };
        case EDIT_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_USER:
            return {
                ...state,
                loading: action.payload
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                // Filtra el usuario eliminado
                users: state.users.filter(user => user.id !== action.payload)
            };
        case DELETE_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RECOVER_PASSWORD:
            return {
                ...state,
                loading: action.payload
            };
        case RECOVER_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [action.payload] // Reemplaza con el usuario recuperado
            };
        case RECOVER_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_PASSWORD:
            return {
                ...state,
                loading: action.payload
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload // Reemplaza con el usuario actualizado
            };
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
