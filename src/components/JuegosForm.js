import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/juegos";
import { Grid, Paper, Button, InputLabel, MenuItem, FormControl, Select, TableContainer, TableHead, TextField, TableRow, TableCell, Table, TableBody, withStyles, FormHelperText } from "@material-ui/core";
import { DragHandle } from "@material-ui/icons";
import useForm from "./useForm";
import { useToasts } from "react-toast-notifications";

const initialFieldValue = {
    Nombre: '',
    descripcion: '',
    genero: '',
    estado: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const JuegosForm = ({ classes, ...props }) => {

    const {addToast}= useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('Nombre' in fieldValues)
        temp.Nombre = fieldValues.Nombre ? "" : "Escriba un nombre"

        if('descripcion' in fieldValues)
        temp.descripcion = fieldValues.descripcion ? "" : "Escriba una descripción"
        
        if('genero' in fieldValues)
        temp.genero = fieldValues.genero ? "" : "Seleccione un genero"

        setErrors({
            ...temp
        })

        if(fieldValues == values)
        return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValue, validate, props.currentNombre)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        //console.log(values)
        if (validate()) {
            
            const onSuccess=()=>
            {
                resetForm()
                addToast("Guardado satisfactoriamente", {apparance:'success'})
            }
            if(props.currentNombre=="")
            props.crearJuego(values,onSuccess)
            else
            props.actualizarJuego(props.currentNombre,values,onSuccess)
        }
           
    }

    useEffect(()=>{
        if(props.currentNombre!="")
        setValues({
            ...props.juegosList.find(x=> x.Nombre ==props.currentNombre)
        })
        setErrors({})
        
    },[props.currentNombre]    
    )


    return (<form autoComplete="on" noValidate className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                    name="Nombre"
                    variant="outlined"
                    label="Nombre"
                    value={values.nombre}
                    onChange={handleInputChange}
                    //error={true}
                    helperText={errors.Nombre}
                    {...(errors.Nombre && { error: true, helperText: errors.Nombre })}
                />


            </Grid>
            <Grid>
                <FormControl variant="outlined" className={classes.formControl}
                    {...(errors.genero && { error: true})}
                >
                    <InputLabel ref={inputLabel}>Genero</InputLabel>
                    <Select
                        name="genero"
                        value={values.genero}
                        onChange={handleInputChange}
                        labelWidth={labelWidth}>
                        <MenuItem value="">Seleccione un genero</MenuItem>
                        <MenuItem value="Accion">Accion</MenuItem>
                        <MenuItem value="Aventura">Aventura</MenuItem>
                        <MenuItem value="Shooter">Shooter</MenuItem>
                    </Select>
                    {errors.genero && <FormHelperText>{errors.genero}</FormHelperText>}

                </FormControl>
            </Grid>

            <Grid >
                <TextField
                    name="descripcion"
                    variant="outlined"
                    label="Descripcion"
                    value={values.descripcion}
                    onChange={handleInputChange}
                    {...(errors.descripcion && { error: true, helperText: errors.descripcion })}

                />
            </Grid>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                >
                    Guaurdar
                </Button>
                <Button
                    variant="contained"
                    className={classes.smMargin}
                    onClick={resetForm}
                >
                    Limpiar
                </Button>
            </div>
        </Grid>
    </form>);
}

const mapStateToProps = state => ({

    juegosList: state.juegos.list

})

const mapActionToProps = {
    crearJuego: actions.crear,
    actualizarJuego: actions.actualizar

}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(JuegosForm));