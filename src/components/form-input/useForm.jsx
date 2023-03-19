import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';

export function useForm(initialFValues) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };
    
    const resetForm = () => {
        setValues(initialFValues);
        setErrors({});
    }

    return {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    // ...other 是除了 children 如果還有其他傳入值都會塞到這個 object 中
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

