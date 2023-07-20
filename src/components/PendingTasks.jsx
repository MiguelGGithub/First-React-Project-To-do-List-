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
  
        setTaskStatus((prevTaskStatus) => {
          const updatedTaskStatus = { ...prevTaskStatus };
          delete updatedTaskStatus[task];
          localStorage.setItem('taskStatus', JSON.stringify(updatedTaskStatus));
          return updatedTaskStatus;
        });
      }
    }
  
    function completeTask(task) {
      setTaskStatus((prevTaskStatus) => {
        const updatedTaskStatus = {
          ...prevTaskStatus,
          [task]: !prevTaskStatus[task],
        };
        localStorage.setItem('taskStatus', JSON.stringify(updatedTaskStatus)); // Store taskStatus in localStorage
        return updatedTaskStatus;
      });
    }
    
  
    const uniqueTasks = [...new Set(taskArray)].filter((task) => task !== '');
  
    function countIncompleteTasks() {
      return uniqueTasks.reduce((count, taskObj) => {
        if (!taskStatus[taskObj.task]) {
          return count + 1;
        }
        return count;
      }, 0);
    }
  
    const incompleteTasksCount = countIncompleteTasks();
  
    useEffect(() => {
      localStorage.setItem('taskArray', JSON.stringify(uniqueTasks));
    }, [uniqueTasks]);
  
    useEffect(() => {
      const storedTaskArray = localStorage.getItem('taskArray');
      if (storedTaskArray) {
        setTaskArray(JSON.parse(storedTaskArray));
      }
  
      const storedTaskStatus = localStorage.getItem('taskStatus');
      if (storedTaskStatus) {
        setTaskStatus(JSON.parse(storedTaskStatus));
      }
    }, [setTaskArray]);
    
    const tasks = uniqueTasks.map((taskObj, index) => (
      <div className={`todo-task ${taskStatus[taskObj.task] ? 'complete-task' : ''}`} key={index}>
        <div className='todo-task-name'>
          <span className={taskStatus[taskObj.task] ? 'complete' : ''}>{taskObj.task}</span>
          <p className={`task-time ${taskStatus[taskObj.task] ? 'complete' : ''}`}>{taskObj.time}</p>
        </div>
        <div>
          <button
            className={`completeTask ${taskStatus[taskObj.task] ? 'complete-button' : ''}`}
            onClick={() => completeTask(taskObj.task)}
          >
            {taskStatus[taskObj.task] ? 'Undo' : 'Complete'}
          </button>
          <button className="deleteTask" onClick={() => deleteTask(taskObj)}>
            X
          </button>
        </div>
      </div>
    ));
  
    return (
      <>
        <div>Incomplete tasks: {incompleteTasksCount}</div>
        {tasks}
      </>
    );
  }

PendingTasks.propTypes = {
  setTaskArray: PropTypes.func.isRequired,
  taskArray: PropTypes.array.isRequired,
};