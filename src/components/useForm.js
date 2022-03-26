import React, {useState, useEffect} from "react";

const useForm = (initialFieldValue, validate, setCurrentNombre) => {
    const [values, setValues]= useState(initialFieldValue)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const {name, value} =e.target
        const fieldValue ={[name]:  value}

        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const resetForm =()=>
    {
        setValues({
            ...initialFieldValue
        })
        setErrors({})
        setCurrentNombre(0)
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };  
}
 
export default useForm;