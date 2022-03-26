import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/juegos";
import { Grid, Paper, TableContainer, Button, ButtonGroup, TableHead, TableRow, TableCell, Table, TableBody, withStyles } from "@material-ui/core";
import JuegosForm from "./JuegosForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme=>({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper:{
         margin: theme.spacing(2),
         padding: theme.spacing(2)
    }
})


//const [clases, props]= props


const Juegos = ({classes, ...props}) => {

    const [currentNombre, setCurrentNombre] =useState(0)
    useEffect(() => {
        props.fetchAllJuegos()
    }, [])

    const {addToast}= useToasts()

    const onDelete = Nombre =>{
        if(window.confirm('¿Esta seguro que desea eliminar este registro?'))
        props.deleteJuegos(Nombre, ()=> addToast("Eliminado satisfactoriamente", {apparance:'info'}))
    }
    return (
        
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <JuegosForm {...({currentNombre, setCurrentNombre})} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Genero</TableCell>
                                    <TableCell>Descripcion</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.juegosList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.nombre}</TableCell>
                                            <TableCell>{record.genero}</TableCell>
                                            <TableCell>{record.descripcion}</TableCell>
                                            <TableCell>{record.estado}</TableCell> 
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentNombre(record.Nombre) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.Nombre)} 
                                                        /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>

    );
}

const mapStateToProps = state => ({

    juegosList: state.juegos.list

})

const mapActionToProps = {
    fetchAllJuegos: actions.consultar,
    deleteJuegos : actions.eliminar
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Juegos));