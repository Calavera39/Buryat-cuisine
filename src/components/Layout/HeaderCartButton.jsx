import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'
import CartContex from '../../store/cart-contex';

const HeaderCartButton = (props) => {
    const [btnIsAnimated, setBtnIsAnimated] = useState(false)
    const cartCtx = useContext(CartContex)
    const { items} = cartCtx

    const numberOfCartItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount
    }, 0)

  
    const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ''}`

    useEffect(() => {
        if(items.length === 0) {
            return
        }
        setBtnIsAnimated(true)

        const timer = setTimeout(() => {
            setBtnIsAnimated(false)
        }, 200);

        return () => {
            clearTimeout(timer)
        }

    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;