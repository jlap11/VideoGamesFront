import  axios  from "axios";

const baseURL= "http://localhost:7071/api/"

export default{
    juegos(url = baseURL + ''){
        return {
            consultar: () => axios.get(url+'Consultar/'),
            fetchById: nombre => axios.get(url + nombre),
            crear: newRecord => axios.post(url+'Crear/',{Nombre:newRecord.Nombre, Descripcion : newRecord.descripcion, Genero:newRecord.genero}),
            actualizar: (nombre, updateRecord) => axios.put(url +'Actualizar/', {Nombre:nombre}),
            eliminar: nombre => axios.delete(url +'Eliminar/', {Nombre:nombre})
        }
    }
}