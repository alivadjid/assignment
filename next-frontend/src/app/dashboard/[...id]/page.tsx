'use client'
import { useContext } from 'react';
import { Fragment, useEffect } from "react"
import { StateContext } from '../../StateContext';
import TaskForm from '../../components/taskFrom/form';
import taskApi from '@/api/taskApi'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import DashboardLayout from '../../components/dashboardLayout'



const Dashboard = () => {
  // console.log('router', router)
  const params = useParams()
  const taskId = params?.id
  console.log('params',taskId)
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

  return (<>
    <DashboardLayout tasks={tasks} deleteTask={deleteTask}>
      <TaskForm />
    </DashboardLayout>
  </>)
}

export default Dashboard