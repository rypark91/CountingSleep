import {  useState } from "react";


import classes from './WriteMenu.module.css';

const WriteMenu = (props) => {

    const [toBedTime, setToBedTime] = useState('');
    const [wakeUpTime, setWakeUpTime] = useState('');

   
    const bedChangeHandler = (event) => {
        if(event.target.key === 'Enter'){
            console.log("Key entered")
        }
        setToBedTime(event.target.value);
    };
    const wakeChangeHandler = (event) => {
        if(event.target.key === 'Enter'){
            console.log("Key entered")
        }
        setWakeUpTime(event.target.value);
    };

    let disabled = false;//!(enteredMessage.length > 0);
    let op = 0.5;
    if(!disabled){
        op = 1;

    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        let tempBedTime = toBedTime.split(":");
        let hourBed = tempBedTime[0];
        let minuteBed = tempBedTime[1];
        let tempBedHour = Number(hourBed);
        let tempBedMinute = Number(minuteBed);

        let tempWakeTime = wakeUpTime.split(":");
        let hourWake = tempWakeTime[0];
        let minuteWake = tempWakeTime[1];;
        let tempWakeHour = Number(hourWake);
        let tempWakeMinute = Number(minuteWake);

        let mBed = "AM";
        let mWake = "AM";
        if(tempBedHour >= 12){
            mBed = "PM";
        }
        if(tempWakeHour >= 12){
            mWake = "PM";
        }
        
        let numberOfHours = 0;
        let numberOfMinutes = 0;


        while((tempBedHour !== tempWakeHour) || (tempBedMinute !== tempWakeMinute)){
            tempBedMinute++;
            numberOfMinutes++;
            if(tempBedMinute === 60){
                tempBedMinute = 0;
                tempBedHour++;
            }
            if(numberOfMinutes === 60){
                numberOfMinutes = 0;
                numberOfHours++;
            }
            if(tempBedHour === 24){
                tempBedHour = 0;
            }
        }
        let newBedHour = Number(hourBed) % 12;
        let newWakeHour = Number(hourWake) % 12;
        if(newBedHour === 0){
            newBedHour = 12;
        }
        if(newWakeHour === 0){
            newWakeHour = 12;
        }
        let finalBedTime = newBedHour + ":" + minuteBed + mBed;
        let finalWakeTime = newWakeHour + ":" + minuteWake + mWake;
        const itemData = {

            bedTime: finalBedTime,
            wakeUpTime: finalWakeTime,
            hour: numberOfHours,
            minute: numberOfMinutes
        };
        props.onCreateItem(itemData);

        setToBedTime("");
        setWakeUpTime("")
    }
    const closeHandler = (event) => {
        event.preventDefault();
        props.onClose();
    } 
    return (
    <div className={classes.modal}>
        <form onSubmit={submitHandler} className={classes.content}>
            <h3>Create Entry</h3>

            <label>Enter Bed Time: </label>
            <input
                type="time" name="bedtime"
                onChange={bedChangeHandler}
                required/><br/>
            <label>Enter Wake Up Time: </label>
            <input
                type="time" name="waketime"
                onChange={wakeChangeHandler}
                required/><br/><br/>


            <button type="submit" disabled={disabled} style={{opacity: op}}>Submit</button>
            <button onClick={closeHandler}>Close</button>
        </form>
    </div>
    );
};

//sources:
//https://stackoverflow.com/questions/60008415/react-js-prevent-line-breaks-or-submit-on-enter-in-the-text-area



export default WriteMenu;