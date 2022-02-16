import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import {
  onValue,
  ref,
  getDatabase,
  remove,
  update,
  push,
} from "firebase/database";
import styles from "./TodoItems.module.css";

const TodoItems = ({ UID }) => {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, updateTodoList] = useState([]);
  const db = getDatabase();
  const postTodoItem = () => {
    push(ref(db, "/user/" + UID.name + "/todoList"), {
      todoItem,
      complete: false,
    });
    setTodoItem("");
  };
  const removeTodoItem = (id) => {
    remove(ref(db, "/user/" + UID.name + "/todoList/" + id));
  };
  const completeTodoItem = (item) => {
    update(ref(db, "/user/" + UID.name + "/todoList/" + item.key), {
      ...item,
      complete: !item.complete,
    });
  };
  useEffect(() => {
    onValue(ref(db, "/user/" + UID.name + "/todoList"), (snapshot) => {
      let todoItems = snapshot.val();
      let todoArr = [];
      for (const key in todoItems) {
        todoArr.push({ key: key, ...todoItems[key] });
      }
      console.log(todoArr);
      updateTodoList(todoArr);
    });
  }, [UID]);
  return (
    <div className={styles.todoContainer}>
      <Input
        id="todo"
        name="todo"
        placeholder="Add Todo"
        value={todoItem}
        onChange={(event) => setTodoItem(event.target.value)}
      />
      <Button color="dark" onClick={postTodoItem}>
        Add
      </Button>
      {todoList && todoList.length > 0
        ? todoList.map((ele) => (
            <div
              key={ele.key}
              className={
                ele.complete
                  ? `${styles.todoCard} ${styles.success}`
                  : styles.todoCard
              }
            >
              <h3>{ele.todoItem}</h3>
              <div className={styles.actionContainer}>
                <Button
                  outline
                  color="dark"
                  onClick={() => removeTodoItem(ele.key)}
                >
                  Remove
                </Button>
                <Button color="dark" onClick={() => completeTodoItem(ele)}>
                  {ele.complete ? "Completed" : "Complete"}
                </Button>
              </div>
            </div>
          ))
        : "Nothing to display"}
    </div>
  );
};

export default TodoItems;
