import{
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

const initalState = {
    phones: [],
    error: null,
    loading: false
}

export default function numbersReducer(state = initalState, action) {
    switch (action.type) {
        case SET_PHONE:
            return {
                ...state,
                loading: action.payload
            };
        case SET_PHONE_SUCCESS:
            return {
                ...state,
                loading: false,
                // Reemplazar la lista completa de teléfonos con el nuevo payload
                phones: action.payload
            };
        case SET_PHONE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_PHONE:
            return {
                ...state,
                loading: action.payload
            };
        case UPDATE_PHONE_SUCCESS:
            return {
                ...state,
                loading: false,
                // Aquí puedes reemplazar o actualizar de forma específica
                phones: state.phones.map(phone =>
                    phone.id === action.payload.id ? action.payload : phone
                )
            };
        case UPDATE_PHONE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case VERIFY_TOKEN:
            return {
                ...state,
                loading: action.payload
            };
        case VERIFY_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                // Reemplazar la lista completa con el nuevo payload
                phones: [action.payload]
            };
        case VERIFY_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESEND_TOKEN:
            return {
                ...state,
                loading: action.payload
            };
        case RESEND_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                // Si quieres reemplazar, en lugar de agregar, asegúrate de asignar el payload completo
                phones: [action.payload]
            };
        case RESEND_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
