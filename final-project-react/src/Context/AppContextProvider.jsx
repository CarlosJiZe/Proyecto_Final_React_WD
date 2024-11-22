import React, { createContext, useContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { SET_HOME_SECTIONS, SET_GRAPH_DATA, SET_TABLE_DATA, SET_PAGINATION,showModal,hideModal, LOGIN,LOGOUT } from "./actions";

const AppContext = createContext();

function AppContextProvider({ children }) {
    const initialState = {
        homeSections: [], // Secciones dinámicas de Home
        graphData: [], // Datos de gráficas
        tableData: [], // Datos de la tabla de Datos
        pagination: {
            currentPage: 1,
            rowsPerPage: 10,
        },
        isModalVisible: false, // Estado para controlar la visibilidad del modal
    };

    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch ,showModal,hideModal}}>
            {children}
        </AppContext.Provider>
    );
}

// Custom Hook to Access Context
function useAppContext() {
    return useContext(AppContext);
}

// Action Creators
function setHomeSections(dispatch, sections) {
    dispatch({ type: SET_HOME_SECTIONS, payload: sections });
}

function setGraphData(dispatch, graphData) {
    dispatch({ type: SET_GRAPH_DATA, payload: graphData });
}

function setTableData(dispatch, tableData) {
    dispatch({ type: SET_TABLE_DATA, payload: tableData });
}

function setPagination(dispatch, pagination) {
    dispatch({ type: SET_PAGINATION, payload: pagination });
}

    // Función para manejar el login
    async function login(dispatch, user) {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user }),
            });
            const data = await res.json();

            if (data.status_code === 1) {
                dispatch({ type: LOGIN, payload: { user: data.user } });
            } else {
                console.error("Error de autenticación:", data.status);
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error.message);
        }
    }

    // Función para manejar el logout
    function logout(dispatch) {
        dispatch({ type: LOGOUT });
    }

export default AppContextProvider;
export { useAppContext, setHomeSections, setGraphData, setTableData, setPagination, login, logout };
