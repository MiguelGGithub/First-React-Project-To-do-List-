import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export function PendingTasks(props) {
  const { taskArray, setTaskArray } = props;
  const [taskStatus, setTaskStatus] = useState({});
  

  function deleteTask(task) {
    const array = [...taskArray];
    const i = array.indexOf(task);
    if (i !== -1) {
      array.splice(i, 1);
      setTaskArray(array);
    }
  }

  function completeTask(task) {
    setTaskStatus((prevTaskStatus) => {
      const updatedTaskStatus = {
        ...prevTaskStatus,
        [task]: !prevTaskStatus[task],
      };
      return updatedTaskStatus;
    });
  }


  const uniqueTasks = [...new Set(taskArray)].filter(task => task !== '');

  useEffect(() => {
    localStorage.setItem('taskArray', JSON.stringify(uniqueTasks));
  }, [uniqueTasks]);

  useEffect(() => {
    const storedTaskArray = localStorage.getItem('taskArray');
    if (storedTaskArray) {
      setTaskArray(JSON.parse(storedTaskArray));
    }
  }, [setTaskArray]);

  

  const tasks = uniqueTasks.map((task, index) => (
    <div className="todo-task" key={`${task}-${index}`}>
      <span className={taskStatus[task] ? 'complete' : ''}>{task}</span>
      <div>
        <button
          className="completeTask"
          onClick={() => completeTask(task)}
        >
          Complete
        </button>
        <button className="deleteTask" onClick={() => deleteTask(task)}>
          X
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="todo-pending-tasks">
        <h1>Pending Tasks ({uniqueTasks.length})</h1>
      </div>
      {tasks}
    </>
  );
}

PendingTasks.propTypes = {
  setTaskArray: PropTypes.func.isRequired,
  taskArray: PropTypes.array.isRequired,
};