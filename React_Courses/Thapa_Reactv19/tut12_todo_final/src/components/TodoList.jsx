import React from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

const TodoList = ({ currTask, checked, handleDeleteTodo, handleChckedTodo }) => {
  return (
    <li className="todo-item">
      <span className={checked ? "checkList" : "noCheckList"}>{currTask}</span>
      <button className="check-btn" onClick={() => handleChckedTodo(currTask)}>
        <MdCheck />
      </button>
      <button className="delete-btn" onClick={() => handleDeleteTodo(currTask)}>
        <MdDeleteForever />
      </button>
    </li>
  );
};

export default TodoList;
