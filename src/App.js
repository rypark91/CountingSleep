
import React, { useState, useEffect } from 'react';

import Title from './components/ItemCollection/Title';
import ItemGrid from './components/ItemCollection/ItemGrid';
import WriteMenu from './components/UI/WriteMenu';
import EditMenu from './components/UI/EditMenu';
import './App.css';

function App() {
  const [itemCollection, setItemCollection] = useState([]);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editIdNum, setEditIdNum] = useState('');
  const [activeClick, setClickable] = useState('');
  const [avgSleepHour, setSleepHour] = useState(0);
  const [avgSleepMinute, setSleepMinute] = useState(0);
  const [createable, setCreateable] = useState(true);
  const currentDate = new Date().toLocaleDateString().split(',');

   
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch('https://countingsleep-e63e4-default-rtdb.firebaseio.com/sleepEntry.json');
      
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      
      const responseData = await response.json();

      const loadedEntries = [];

      for (const key in responseData){
        loadedEntries.push({
          bedTime: responseData[key].bedTime,
          wakeUpTime: responseData[key].wakeUpTime,
          hour: responseData[key].hour,
          minute: responseData[key].minute,
          date: responseData[key].date,
          id: responseData[key].id
          
        });
      }
      setItemCollection(loadedEntries);
      if(loadedEntries.length > 0){
        let totalHour = 0;
      let totalMinute = 0;
      for(let item of loadedEntries){
        totalHour += item.hour;
        totalMinute += item.minute;
      }
      totalMinute += (totalHour * 60);
      let avgMinute = Math.floor(totalMinute / loadedEntries.length);
      let finalHour = Math.floor(avgMinute / 60);
      let finalMinute = avgMinute % 60;
      setSleepHour(finalHour);
      setSleepMinute(finalMinute);
        if(loadedEntries[0].date[0] === currentDate[0]){
          setCreateable(false);
        }
      }

    };
    fetchEntries();
    }, []);
   
    const addToFile = async (collection) => {
      // PUT request using fetch with async/await
      async function updateEntries() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collection),
        };
        const response = await fetch('https://countingsleep-e63e4-default-rtdb.firebaseio.com/sleepEntry.json', requestOptions);
        const data = await response.json();
        console.log(data);
    }

    updateEntries();
 
  }  
  const removeFromFile = async (collection) => {
    async function updateEntries() {
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(collection),
      };
      const response = await fetch('https://countingsleep-e63e4-default-rtdb.firebaseio.com/sleepEntry.json', requestOptions);
      const data = await response.json();
      console.log(data);
  }

  updateEntries();

}  
  
  const saveToFile = async () => {
      async function updateEntries() {
          const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(itemCollection),
          };
          const response = await fetch('https://countingsleep-e63e4-default-rtdb.firebaseio.com/sleepEntry.json', requestOptions);
          const data = await response.json();
          console.log(data);
      }
  
      updateEntries();
 
  }

  


  const createHandlerItem = (enteredItemData) => {
    let newList = [{ bedTime: enteredItemData.bedTime,
      wakeUpTime: enteredItemData.wakeUpTime,
      hour: enteredItemData.hour,
      minute: enteredItemData.minute,
      date: new Date().toLocaleDateString().split(','),
      id: Math.random().toString()}, ...itemCollection];
    
    let totalHour = 0;
    let totalMinute = 0;
    for(let item of newList){
      totalHour += item.hour;
      totalMinute += item.minute;
    }
    totalMinute += (totalHour * 60);
    let avgMinute = Math.floor(totalMinute / newList.length);
    let finalHour = Math.floor(avgMinute / 60);
    let finalMinute = avgMinute % 60;
    setSleepHour(finalHour);
    setSleepMinute(finalMinute);
    setItemCollection(newList);
    setVisibleMenu(false);
    setClickable('');
    if(newList.length > 0){
      if(newList[0].date[0] === currentDate[0]){
        setCreateable(false);
      }
    }
    addToFile(newList); 
 
  };
  const removeItemHander = (id) => {
    var result = itemCollection.filter(rItem => {
      return rItem.id !== id;
    });
    if(result.length !== 0){
      if(result[0].date[0] !== currentDate[0]){
        setCreateable(true);
      }
    }
    else{
      setCreateable(true);
    }
    let totalHour = 0;
    let totalMinute = 0;
    if(result.length !== 0){
      for(let item of result){
        totalHour += item.hour;
        totalMinute += item.minute;
      }
      totalMinute += (totalHour * 60);
      let avgMinute = Math.floor(totalMinute / result.length);
      let finalHour = Math.floor(avgMinute / 60);
      let finalMinute = avgMinute % 60;
      setSleepHour(finalHour);
      setSleepMinute(finalMinute);
    }
    else{
      setSleepHour(0);
      setSleepMinute(0);
    }
    

    setItemCollection(result);
    removeFromFile(result);
  }
  const editItemHandler = (editItem) => {
    
    var result = itemCollection.findIndex(rItem => rItem.id === editIdNum);
    
    let newArray = itemCollection;
    
    newArray[result].bedTime = editItem.bedTime;
    newArray[result].wakeUpTime = editItem.wakeUpTime;
    newArray[result].hour = editItem.hour; 
    newArray[result].minute = editItem.minute;
    let totalHour = 0;
    let totalMinute = 0;
    for(let item of newArray){
      totalHour += item.hour;
      totalMinute += item.minute;
    }
    totalMinute += (totalHour * 60);
    let avgMinute = Math.floor(totalMinute / newArray.length);
    let finalHour = Math.floor(avgMinute / 60);
    let finalMinute = avgMinute % 60;
    setSleepHour(finalHour);
    setSleepMinute(finalMinute);

    setVisibleEdit(false);
    setItemCollection(newArray);
    saveToFile();
  }
  const toggleMenuHandler = () => {
    setClickable('disableClick');
    setVisibleMenu(true);
  }
  const toggleEditHandler = (id) => {
    setEditIdNum(id);
    setVisibleEdit(true);
    
  }

  const closeHandler = () => {
    setVisibleEdit(false);
    setVisibleMenu(false);
    setClickable('');
  }
  
  
  return (
    <div className="App">
      <h1>Counting Sleep</h1>
      <div className="mainContainer">
        <div className="clockContainer">
        <Title 
        clickableClass={activeClick}
        onToggleMenu={toggleMenuHandler}
        create={createable}/>
        { visibleMenu && <WriteMenu onCreateItem={createHandlerItem} onClose={closeHandler}/>}
        { visibleEdit && <EditMenu onEditItem={editItemHandler} onClose={closeHandler}/>}

        </div>
        <div className="enteriesContainer">
          
          <h4>Average sleep time: {avgSleepHour} hour(s) {avgSleepMinute} minute(s)</h4>
          <ItemGrid
      items={itemCollection}
      editToggled={visibleEdit}
      clickableClass={activeClick}
      onRemove={removeItemHander} 
      onEditToggle={toggleEditHandler}/>
            
           
          
    
        </div>
      </div>
      
      
      {/* <ItemGrid
      items={itemCollection}
      editToggled={visibleEdit}
      clickableClass={activeClick}
      onRemove={removeItemHander} 
      onEditToggle={toggleEditHandler}/> */}
    </div>
  );
}

export default App;
