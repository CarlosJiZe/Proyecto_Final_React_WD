import { SET_HOME_SECTIONS, SET_GRAPH_DATA, SET_TABLE_DATA, SET_PAGINATION, SHOW_MODAL, HIDE_MODAL } from "./actions";

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
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

export default AppReducer;
