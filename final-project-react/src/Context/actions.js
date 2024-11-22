export const SET_HOME_SECTIONS = "SET_HOME_SECTIONS";
export const SET_GRAPH_DATA = "SET_GRAPH_DATA";
export const SET_TABLE_DATA = "SET_TABLE_DATA";
export const SET_PAGINATION = "SET_PAGINATION";
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ALL_DATA = 'SET_ALL_DATA';

export const showModal = (dispatch) => {
    dispatch({ type: SHOW_MODAL });
};

// Acción para ocultar el modal
export const hideModal = (dispatch) => {
    dispatch({ type: HIDE_MODAL });
};