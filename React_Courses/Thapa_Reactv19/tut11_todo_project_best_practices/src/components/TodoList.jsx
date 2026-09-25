import React from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

const TodoList = ({currTask, handleDeleteTodo}) => {
  return (
    <li className="todo-item">
      <span>{currTask}</span>
      <button className="check-btn">
        <MdCheck />
      </button>
      <button className="delete-btn" onClick={() => handleDeleteTodo(currTask)}>
        <MdDeleteForever />
      </button>
    </li>
  );
};

export default TodoList;
