

import classes from "./Title.module.css";

const Title = (props) => {;

    const createItemHandler = (event) => {
        event.preventDefault();
        props.onToggleMenu();
    };

    return (
        <div className={`${classes.titleLine} ${props.clickableClass}`}>
            <h1>One entry per day
                {props.create && <button onClick={createItemHandler}>+ Create</button>}</h1>
                {/* <h2>To Do (React edition)
                <button onClick={createItemHandler}>+ Create</button></h2> */}
            <p>(By Ryan Park &copy; 2023)</p>
        </div>
    );
}

export default Title;