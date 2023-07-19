import React from 'react';
import { InputTask } from './InputTask';
import { PendingTasks } from './PendingTasks';



export default function Body() {
    const [taskArray, setTaskArray] = React.useState(() => {
      const storedTaskArray = localStorage.getItem('taskArray');
      return storedTaskArray ? JSON.parse(storedTaskArray) : [];
    });
    
    React.useEffect(() => {
      const stringifiedTaskArray = JSON.stringify(taskArray);
      localStorage.setItem('taskArray', stringifiedTaskArray);
    }, [taskArray]);
  
    return (
      <div className="todo-body">
        <PendingTasks taskArray={taskArray} setTaskArray={setTaskArray} />
        <InputTask taskArray={taskArray} setTaskArray={setTaskArray} />
      </div>
    );
  }

