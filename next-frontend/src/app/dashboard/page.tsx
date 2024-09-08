'use client'
import { useContext } from 'react';
import { Fragment, useEffect } from "react"

import DashboardLayout from '../components/dashboardLayout'
// import { useRouter } from 'next/router'

import { StateContext } from '../StateContext';
import taskApi from '@/api/taskApi'
const Dashboard = () => {
  // const router = useRouter()
  // console.log('router', router)
  const { saveTasks, token, tasks } = useContext(StateContext);

  useEffect(() => {
    if(token) {
      getTasks()
    }
  }, [token])

  function getTasks() {
    taskApi.getTaskList(token).then((taskList) => {
      saveTasks(taskList) 
      console.log('taskList', taskList)
      console.log('tasks', tasks)
    })
  }

  async function deleteTask(id: string) {
    console.log('delte', id)
    const deletedTask = await taskApi.deleteTask({id, token})
    console.log('ddd', deletedTask)
    if (deletedTask.deleted) {
      getTasks()
    }
  }

  return <>
    <DashboardLayout tasks={tasks} deleteTask={deleteTask} />
  </>
}

export default Dashboard