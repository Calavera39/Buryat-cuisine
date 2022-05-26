import React from 'react';
import FoodImg from '../../assets/bf2.jpeg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Buryat cuisine</h1>
                <HeaderCartButton  onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={FoodImg} alt='food'/>
            </div>
        </React.Fragment>
            
        
    );
};

export default Header;