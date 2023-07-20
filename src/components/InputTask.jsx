import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export function InputTask(props) {
  const { setTaskArray } = props;
  const [taskInputValue, setTaskInputValue] = React.useState('');
  const [timeInputValue, setTimeInputValue] = React.useState('');
  const [isTimeInputValid, setIsTimeInputValid] = React.useState(true);
  const [currentDayTime, setCurrentDayTime] = React.useState('');

  const warningRef = useRef(null);

  React.useEffect(() => {
    // Function to get the current time and day of the week
    function getCurrentDayTime() {
      const currentTime = new Date();
      const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true, second: 'numeric' };
      const formattedDayTime = currentTime.toLocaleString('en-US', options);
      setCurrentDayTime(formattedDayTime);
    }

    getCurrentDayTime();

    // Update the current time and day of the week every minute
    const interval = setInterval(getCurrentDayTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function isValidDayTime(input) {
    // Regular expression to match valid day and time format
    const dayTimeRegex = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Today)\s\d{1,2}(:\d{2})?\s?(AM|PM)?$/i;
    return dayTimeRegex.test(input);
  }

  function storeInput(event) {
    event.preventDefault();
    if (taskInputValue.trim() !== '' && isValidDayTime(timeInputValue.trim())) {
      const newTask = { task: taskInputValue, time: timeInputValue.toUpperCase() };
      setTaskArray((prevTaskArray) => [...prevTaskArray, newTask]);
      setTaskInputValue('');
      setTimeInputValue('');
      setIsTimeInputValid(true); // Reset the validity state
    } else {
      setIsTimeInputValid(false);
      warningRef.current.classList.add('shake'); // Add "shake" class when the input is invalid
    }
  }

  function getTaskInput(event) {
    setTaskInputValue(event.target.value);
  }

  function getTimeInput(event) {
    setTimeInputValue(event.target.value);
    setIsTimeInputValid(true); // Reset the validity state when the user types in the input field
    warningRef.current.classList.remove('shake'); // Remove "shake" class when the user starts typing again
  }

  function stopEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  return (
    <>
      <div>{currentDayTime}</div>
      <form onSubmit={storeInput} className='todo-input-form'>
        <div>
          <label htmlFor="taskName">Task</label>
          <input
            type="text"
            id="taskName"
            name="task"
            value={taskInputValue}
            onChange={getTaskInput}
            onKeyDown={stopEnter}
            placeholder="Add a new task"
            className={`todo-task-inputter ${isTimeInputValid ? '' : 'invalid'}`}
          />
        </div>
        <div>
          <label htmlFor="taskTime">Day & Time</label>
          <input
            type="text"
            id="taskTime"
            name="time"
            value={timeInputValue}
            onChange={getTimeInput}
            onKeyDown={stopEnter}
            placeholder="Time and Day"
            className={`todo-task-inputter ${isTimeInputValid ? '' : 'invalid'}`}
          />
        </div>
        {!isTimeInputValid && (
          <div ref={warningRef} className="time-input-warning shake">
            Please enter a valid task or time (e.g., 'Friday 9PM' or 'Today 1:30 PM').
          </div>
        )}
        <button type="submit">Add Task</button>
      </form>
    </>
  );
}

InputTask.propTypes = {
  setTaskArray: PropTypes.func.isRequired,
  taskArray: PropTypes.array.isRequired,
};