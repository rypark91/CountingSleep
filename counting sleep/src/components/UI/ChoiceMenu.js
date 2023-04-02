import classes from "./ChoiceMenu.module.css";

const ChoiceMenu = (props) => {


    const deleteHandler = (event) =>{
        props.onDeleteItem();
        
    }
    const toggleEditHandler = () =>{
        props.onEditToggle();
    }

    return (
        <div className={`${classes.editMenu} ${classes.evenBackground}`}>
            <span onClick={toggleEditHandler}>Edit </span>
            <span onClick={deleteHandler}>Del</span>
        </div>
    );
}

export default ChoiceMenu;