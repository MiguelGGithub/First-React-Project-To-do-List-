import React from 'react';
import PropTypes from 'prop-types';

export function InputTask(props) {
  const { setTaskArray } = props;
  const [taskInputValue, setTaskInputValue] = React.useState('');

  function storeInput(event) {
    event.preventDefault();
    setTaskArray(prevTaskArray => [...prevTaskArray, taskInputValue]);
    setTaskInputValue('');
  }

  function getInput(event) {
    setTaskInputValue(event.target.value);
  }

  return (
    <>
      <form onSubmit={storeInput}>
        <input
          type="text"
          name="task"
          value={taskInputValue}
          onChange={getInput}
          placeholder="Add a new task"
          className='todo-task-inputter'
        />
      </form>
    </>
  );
}

InputTask.propTypes = {
  setTaskArray: PropTypes.func.isRequired,
  taskArray: PropTypes.array.isRequired,
};

