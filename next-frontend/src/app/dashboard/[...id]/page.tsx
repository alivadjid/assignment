'use client'
import TaskForm from '../../components/taskFrom/form';
import { DashboardLayout } from '../../components/dashboardLayout'

const Dashboard = () => {
  return (<>
    <DashboardLayout>
      <TaskForm/>
    </DashboardLayout>
  </>)
}

export default Dashboard