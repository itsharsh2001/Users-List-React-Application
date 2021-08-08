import React, { useState, useRef } from "react";
import { Card } from "../UI/Card";
import classes from "./AddUser.module.css";
import { Button } from "../UI/Button";
import { ErrorModal } from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

export const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();//Initial state is completely undefined

  const addUserHandler = (Event) => {
    Event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)."
      });
      return;
    }

    if (+enteredUserAge < 1) {
      //enteredAge ke piche + lgane se hum use string se number mein convert kr dete hai
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0)."
      });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';//rarely use refs to manipulate dom
    ageInputRef.current.value = '';
    // console.log(enteredUsername, enteredAge);
    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const usernameChangeHandler = (Event) => {
  //   setEnteredUsername(Event.target.value);
  // };

  // const ageChangeHandler = (Event) => {
  //   setEnteredAge(Event.target.value);
  // };

  const errorHandler = () => {
    setError(null);//Aisa krne se error false ho jayega aur ErrorModal render nhi hoga
  }

  return (
    // <div>
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername} //to make input field empty after form is submitted
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />

          <label htmlFor="age">Age(In Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />

          {/* <button type="submit">Add User</button> */}
          <Button type="submit">Add User</Button>
        </form>
      </Card>
      </Wrapper>
    // </div>
  );
};
