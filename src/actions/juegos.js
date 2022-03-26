import  api  from "./api";

export const ACTION_TYPES = {
    CREAR: 'Crear',
    ACTUALIZAR: 'Actualizar',
    ELIMINAR: 'Eliminar',
    CONSULTAR: 'Consultar'
}
const formateData = data => ({
    ...data,
    //age: parseInt(data.age ? data.age : 0)
})

export const consultar = () => dispatch => {
    api.juegos().consultar()
        .then(
            response => {
                dispatch(
                    {
                        type: ACTION_TYPES.CONSULTAR,
                        payload: response.data.objJuego
                    }
                )
            }
        )
        .catch(err => console.log(err))

}

export const crear = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    console.log(data)
    api.juegos().crear(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREAR,
                payload: res.data.objJuego
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const actualizar = ( data, onSuccess) => dispatch => {
    //data = formateData(data)
    api.juegos().actualizar(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.ACTUALIZAR,
                payload: res.data.objJuego
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const eliminar = ( data, onSuccess) => dispatch => {
    //data = formateData(data)
    api.juegos().eliminar(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.ELIMINAR,
                payload: res.data.objJuego
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}