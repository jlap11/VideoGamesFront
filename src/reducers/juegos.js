import { ACTION_TYPES } from "../actions/juegos";
const initialState ={
    list: []
}

export const juegos = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.CONSULTAR:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREAR:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.ACTUALIZAR:
            return {
                ...state,
                list: state.list.map(x => x.nombre == action.payload.nombre ? action.payload : x)
            }

        case ACTION_TYPES.ELIMINAR:
            return {
                ...state,
                list: state.list.filter(x => x.nombre != action.payload)
            }
            
        default:
            return state
    }
}