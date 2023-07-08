import React, { useState } from 'react';
import './Todo.css';

const TodoList = () => {
  const [todo, setTodo] = useState([]);
  const [inpVal, setInpVal] = useState('');
  const [editIndex, setEditIdx] = useState(-1);
  const [editVal, setEditVal] = useState('');

  const addTodo = () => {
    if (inpVal.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inpVal,
      };

      setTodo([...todo, newTodo]);
      setInpVal('');
    }
  };

  const onHandleChange = (e) => {
    setInpVal(e.target.value);
  };

  const editFunc = (index, task) => {
    setEditIdx(index);
    setEditVal(task);
  };

  const saveChanges = (index) => {
    if (editVal.trim() !== '') {
      const updatedTodo = [...todo];
      updatedTodo[index].text = editVal;
      setTodo(updatedTodo);
    }
    setEditIdx(-1);
    setEditVal('');
  };

  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((todo) => todo.id !== id);
    setTodo(updatedTodo);
  };

  const tasksRender = todo.map((todo, index) => (
    <div key={todo.id}>
      {index === editIndex ? (
        <input
          type="text"
          className='input'
          value={editVal}
          onChange={(e) => setEditVal(e.target.value)}
          onBlur={() => saveChanges(index)}
          autoFocus
        />
      ) : (
        <span className='span' onClick={() => editFunc(index, todo.text)}>{todo.text}</span>
      )}
      {index !== editIndex && <button className="button" onClick={() => deleteTodo(todo.id)}>Delete</button>}
    </div>
  ));

  return (
    <div className="mainTodo">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inpVal}
          onChange={onHandleChange}
          className='input'
          placeholder="Enter a task"
        />
        <button onClick={addTodo} className="button">
          Add Task
        </button>
      </div>
      <h2>TASKS</h2>
      {tasksRender}
    </div>
  );
};

export default TodoList;
