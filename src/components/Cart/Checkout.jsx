import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css'


const isEmpty = value => value.trim() === ''
const isFive = value => value.trim().length !== 6

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value


        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = !isFive(enteredPostal)
        const enteredCityIsValid = !isEmpty(enteredCity)


        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        })

        const formIsValid = enteredCityIsValid && enteredStreetIsValid && enteredNameIsValid && enteredPostalIsValid
        
        
        
        if(!formIsValid) {
            return
        } 

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        })
    
    
    }


    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`

    const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? '' : classes.invalid
    }`
    const postalControlClasses = `${classes.control} ${
        formInputsValidity.postal ? '' : classes.invalid
    }`
    const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? '' : classes.invalid
    }`

    return (
        <form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameInputRef} type='text' id='name'/>      
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Your Street</label>
            <input ref={streetInputRef} type='text' id='street'/> 
            {!formInputsValidity.street && <p>Please enter a valid street</p>}
        </div>
        <div className={postalControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalInputRef} type='text' id='postal'/> 
            {!formInputsValidity.postal && <p>Please enter a valid postal code</p>}     
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input ref={cityInputRef} type='text' id='city'/>      
            {!formInputsValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className={classes.actions}>
        <button>Confirm</button> 
        <button onClick={props.onCancel} type='button'>Cancel</button>       
        </div>
        </form>
    );
};

export default Checkout;