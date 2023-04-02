import React from 'react';

import Item from '../UI/Item';
import classes from './ItemGrid.module.css';


const ItemGrid = (props) => {
  
  const removeItemHander = (id) => {
    props.onRemove(id);
  }
  const toggleEditHandler = (id) => {
    props.onEditToggle(id);
  }
  const toggleCheckHandler = (id) => {
    props.onCheckToggle(id);
  }

  
  return (
    <div className={`${classes.GridContainer} ${props.clickableClass}`}>
      {props.items.map((item) => (
        <Item key={item.id} 
        iden={item.id}
        onRemoveItem={removeItemHander}
        onEditToggle={toggleEditHandler}
        onCheckToggle={toggleCheckHandler}
        bedTime={item.bedTime}
        wakeUpTime={item.wakeUpTime}
        hour={item.hour}
        minute={item.minute}
        date={item.date}/>
      ))}

    </div>
  );
};

export default ItemGrid;