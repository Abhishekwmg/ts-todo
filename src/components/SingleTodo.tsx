import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit } from "react-icons/ai";
import { MdDone, MdDelete } from "react-icons/md";
import "./style.css";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const EditIcon = AiFillEdit as React.ComponentType;
const DeleteIcon = MdDelete as React.ComponentType;
const DoneIcon = MdDone as React.ComponentType;

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //   const handleEdit = (id:number) => {
  //     setTodos(todos.)
  //   }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      action=""
      className="todos_single"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputRef}
          className="todos__single--text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div className="">
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <EditIcon />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <DoneIcon />
        </span>
        <span className="icon"></span>
        <span className="icon"></span>
      </div>
    </form>
  );
};

export default SingleTodo;
