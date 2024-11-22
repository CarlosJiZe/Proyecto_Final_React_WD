import { SET_HOME_SECTIONS, SET_GRAPH_DATA, SET_TABLE_DATA, SET_PAGINATION, SHOW_MODAL, HIDE_MODAL, LOGIN,LOGOUT, SET_ALL_DATA } from "./actions";

function AppReducer(state, action) {
    switch (action.type) {
        case SET_HOME_SECTIONS:
            return {
                ...state,
                homeSections: action.payload,
            };
        case SET_GRAPH_DATA:
            return {
                ...state,
                graphData: action.payload,
            };
        case SET_TABLE_DATA:
            return {
                ...state,
                tableData: action.payload,
            };
        case SET_PAGINATION:
            return {
                ...state,
                pagination: action.payload,
            };
        case SHOW_MODAL:
            return {
                ...state,
                isModalVisible: true, // Mostrar el modal
            };
        case HIDE_MODAL:
            return {
                ...state,
                isModalVisible: false, // Ocultar el modal
            };
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user, // Guardar el usuario autenticado
                };
            
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null, // Limpiar el usuario
                };
        case SET_ALL_DATA:
            return {
                ...state,
                allData: action.payload,
                };
                  
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

export default AppReducer;
