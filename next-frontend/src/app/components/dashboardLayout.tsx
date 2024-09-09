import Link from 'next/link';
import { Fragment, useContext, useEffect, useState, createContext } from "react"
import { StateContext } from '../StateContext';
import taskApi from '@/api/taskApi'
import { TaskApi } from '../../../pages/api/tasks/list';

const TaskContext = createContext({
  addTask: (task: TaskApi) => {task},
  updateTask: (task: TaskApi) => {task},
  tasks: [{title: '', dueDate: '', id: '', description: '', status: 'pending'}]
});

const DashboardLayout = ({
  children, 
}: {
  children?: React.ReactNode, 
}) => {
  const { token } = useContext(StateContext);
  const [tasks, setTasks] = useState<TaskApi[]>([]);


  useEffect(() => {
    if(token) {
      getTasks()
    }
  }, [token])

  function getTasks() {
    taskApi.getTaskList(token).then((taskList) => {
      saveTasks(taskList) 
    })
  }

  async function deleteTask(id: string) {
    const deletedTask = await taskApi.deleteTask({id, token})
    if (deletedTask.deleted) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  const saveTasks = (tasks: TaskApi[]) => {
    setTasks(tasks)
  }

  const addTask = (task: TaskApi) => setTasks([...tasks, task])
  const updateTask = (task: TaskApi) => {
    const index = tasks.findIndex(t => t.id === task.id)
    if(index !== -1) {
      setTasks([...tasks.slice(0, index), task, ...tasks.slice(index + 1)])
    }
  }
  return (
    <>
      <Fragment>
        <div className="flex h-screen">
          <div className="p-4 w-[40%] bg-gray-100 border-r border-gray-300 rounded-2xl">
            <Link href={`/dashboard/new`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Task
            </Link>
            <ul className="mt-4">
              { Array.isArray(tasks) && tasks.map((task) => {
                return (
                  <li className="py-2 border-b border-gray-300 cursor-pointer" key={task.id}>
                    <div className="flex justify-between">
                      <div>
                        {task.title}
                      </div>
                      <div className='flex'>
                        <Link href={`/dashboard/${task.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded mr-1">Edit</Link>
                        <button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded">Delete</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="p-4 w-full bg-white rounded-2xl">
            <h2 className="text-xl font-bold">Summary</h2>
            <h2 className="text-2xl font-bold mb-4">Task edit and add</h2>
            <div className="bg-gray-100 p-4 rounded">
              {/* <!-- Add your task edit and add form here --> */}
              <TaskContext.Provider value={{addTask, updateTask, tasks}}>
              {children}
              </TaskContext.Provider>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  )
}

export { DashboardLayout, TaskContext };
