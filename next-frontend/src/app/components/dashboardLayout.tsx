import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from "react"
import { StateContext } from '../StateContext';
import taskApi from '@/api/taskApi'
import { TaskApi } from '../../../pages/api/tasks/list';
import { TaskSummaryApi } from '../../../pages/api/tasks/summary';
import TaskChart from './TaskCart';
import Skeleton from './skeleton';
import Loader from './loader';
import { navigate } from '../actions';

const DashboardLayout = () => {
  const { token } = useContext(StateContext);
  const [tasks, setTasks] = useState<TaskApi[]>([]);
  const [summary, setSummary] = useState<TaskSummaryApi>()
  const [loading, setLoading] = useState(true)
  const [addTaskLoading, setAddTaskLoading] = useState(false)
  const [editTaskLoading, setEditTaskLoading] = useState('')
  const [deleteTaskLoading, setDeleteTaskLoading] = useState('')


  useEffect(() => {
    if(token) {
      getTasks()
      getSummary()
    }
  }, [token])

  function getTasks() {
    taskApi.getTaskList(token).then((taskList) => {
      saveTasks(taskList) 
      setLoading(false)
    })
  }

  function getSummary() {
    taskApi.getSummary({token}).then((summary) => {
      setSummary(summary)
    })
  }

  async function deleteTask(id: string) {
    setDeleteTaskLoading(id)
    const deletedTask = await taskApi.deleteTask({id, token})
    if (deletedTask.deleted) {
      getSummary()
      setTasks(tasks.filter((task) => task.id !== id))
      setDeleteTaskLoading('')
    }
  }

  const saveTasks = (tasks: TaskApi[]) => {
    setTasks(tasks)
  }

  function handlerAddTask() {
    setAddTaskLoading(true)
    navigate('dashboard/new')
  }
  function handlerEditTAsk(id: string) {
    setEditTaskLoading(id)
  }
  return (
    <>
      <Fragment>
        {
          loading 
          ? <Skeleton /> 
          : <div className="flex flex-wrap justify-center mb-4">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4 bg-white rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Task List</h2>
            <button
              type="submit"
              name="signIn"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={addTaskLoading}
              onClick={handlerAddTask}
            >
              {
                addTaskLoading ? <Loader /> : 'Add Task'
              }
            </button>
            <ul className="mt-4">
              {Array.isArray(tasks) && tasks.map((task) => {
                return (
                  <li className="py-2 border-b border-gray-300 cursor-pointer" key={task.id}>
                    <div className="flex justify-between">
                      <div>
                        {task.title}
                      </div>
                      <div className="flex">
                        <Link
                          href={`/dashboard/${task.id}`} 
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded mr-1"
                          onClick={() => handlerEditTAsk(task.id)}
                        >
                          { editTaskLoading === task.id ? <Loader /> : 'Edit' }
                        </Link>
                        <button 
                          onClick={() => deleteTask(task.id)} 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded"
                          disabled={deleteTaskLoading === task.id}
                        >
                          { deleteTaskLoading === task.id ? <Loader /> : 'Delete' }
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="w-full md:w-1/2 xl:w-1/3 p-4 bg-white rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Summary: {summary?.totalTasks}</h2>
            <h5 className="text-sm font-bold">Pending: {summary?.pendingTasks}, In Progress: {summary?.inProgressTasks}, Completed: {summary?.completedTasks}</h5>
            <div className="bg-gray-100 p-4 rounded">
              {summary && Object.values(summary).some(e => e) && 
                <div className="mx-auto flex justify-center p-1 md:p-6 lg:p-8 w-full">
                  <TaskChart data={summary} />
                </div>
              }
            </div>
          </div>
        </div>
        }
        
      </Fragment>
    </>
  )
}

export { DashboardLayout };
