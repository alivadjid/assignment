'use client'
import { useContext } from 'react';
import { StateContext } from '../StateContext';
import { Fragment, useEffect } from "react"
import taskApi from '@/api/taskApi'
const Dashboard = () => {
  const { saveTasks, token, tasks } = useContext(StateContext);

  useEffect(() => {
    taskApi.getTaskList(token).then((taskList) => {
      saveTasks(taskList) 
      console.log('taskList', taskList)
      console.log('tasks', tasks)
    })
  }, [token])

  return (<>
   <Fragment>
    <div className="flex h-screen">
      <div className="p-4 w-1/4 bg-gray-100 border-r border-gray-300 rounded-2xl">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
        <ul className="mt-4">
          { Array.isArray(tasks) && tasks.map((task) => {
            return <li className="py-2 border-b border-gray-300 cursor-pointer" key={task.id}>{task.title}</li>
          })}
        </ul>
      </div>

      <div className="p-4 w-full bg-white rounded-2xl">
        <h2 className="text-xl font-bold">Summary</h2>
        <h2 className="text-2xl font-bold mb-4">Task edit and add</h2>
        <div className="bg-gray-100 p-4 rounded">
          {/* <!-- Add your task edit and add form here --> */}
        </div>
      </div>
    </div>
   </Fragment>
  </>)
}

export default Dashboard