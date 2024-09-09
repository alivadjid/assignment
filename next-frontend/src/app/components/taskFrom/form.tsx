import { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'next/navigation'
import { StateContext } from '@/app/StateContext';
import taskApi from '@/api/taskApi'
import { TaskApi } from '../../../../pages/api/tasks/list';

const TaskForm = () => {
  const { token, tasks, addTask, updateTask } = useContext(StateContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<TaskApi['status']>('pending');

  const params = useParams()
  const queryId = Array.isArray(params?.id) ? params?.id[0] : ''
  const isMounted = useRef(false)

  useEffect(() => {
    const setFormInitialData = () => {
      if(queryId === 'new') {
        setDefaultValues({})
      } else if(queryId && tasks.length) {
        const taskId = queryId
        const activeTask = tasks?.find((task) => task.id === taskId) as TaskApi
        if (!activeTask) return
        setDefaultValues({title: activeTask.title, description: activeTask.description, dueDate: activeTask.dueDate, status: activeTask.status})
      }
    }
  
    if (isMounted.current && queryId) {
      setFormInitialData()
    } else {
      isMounted.current = true
    }
  }, [queryId, tasks])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (queryId === 'new') {
      const createdTask = await taskApi.createTask({token, taskData: {title, description, dueDate, status}})
      addTask(createdTask)
    } else {
      const updatedTask = await taskApi.updateTask({token, taskData: {title, description, dueDate, status, id: queryId}})
      updateTask(updatedTask[0])
    }
  };

  const setDefaultValues = ({title = '', description = '', dueDate = '', status = 'pending' as TaskApi['status']}) => {
    setTitle(title)
    setDescription(description)
    setDueDate(dueDate)
    setStatus(status)
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Task Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskApi['status'])}
          >
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {queryId === 'new' ? 'Add Task' : 'Update Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;