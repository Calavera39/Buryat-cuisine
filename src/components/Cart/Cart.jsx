import React, {useContext, useState} from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContex from '../../store/cart-contex';
import CartItem from './CartItem'
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx = useContext(CartContex)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const HasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }
    const cartItemaddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }


    const orderHandler = () => {
        setIsCheckout(true)
    }


    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        const response = await fetch('https://react-b2096-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    } 

    const cartItems = cartCtx.items.map(item => 
    <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemaddHandler.bind(null, item)} />)
    

    const modalActions = 
        <div className={classes.actions}>
            <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
            {HasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
        </div>

    const cartModalContent = <React.Fragment>
        <ul className={classes['cart-items']}>{cartItems}</ul>
           
           <div className={classes.total}>
               <span>Total amount</span>
               <span>{totalAmount}</span>
           </div>
           {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
           {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending oreder data...</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Your order was successfuly sent</p>
        <div className={classes.actions}>
            <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
        </div>
    </React.Fragment>

    return (
        <Modal onClose={props.onHideCart}>
            
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;