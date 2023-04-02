import React from 'react';

import ChoiceMenu from "./ChoiceMenu";
import classes from "./Item.module.css";
import "./Item.module.css"

const Item = (props) => {
    
    const deleteItemHandler = () => {
        props.onRemoveItem(props.iden);
    };
    const toggleEditHandler = () => {
        props.onEditToggle(props.iden);
    };
    
    
    return (
        <div className={classes.itemContainer}>
            
            <div className={`${classes.item}`}>
                
                <p>Date: {props.date}</p><br/>
                <p>Bed Time: {props.bedTime}</p><br/>
                <p>Wake Time: {props.wakeUpTime} </p><br/>
                <p>Hours and minutes slept: {props.hour} hours and {props.minute} minutes</p>
                
            </div>
            <ChoiceMenu onDeleteItem={deleteItemHandler} 
                        onEditToggle={toggleEditHandler}
                        />
           
        </div>
        
    );
}

export default Item;