import Link from 'next/link';
import { Fragment } from "react"
import { TaskApi } from '../../../pages/api/tasks/list';

const DashboardLayout = ({
  children, 
  tasks,
  deleteTask
}: {
  children?: React.ReactNode, 
  tasks: TaskApi[],
  deleteTask: (id: string) => void
}) => {
  return (
    <>
      <Fragment>
        <div className="flex h-screen">
          <div className="p-4 w-[40%] bg-gray-100 border-r border-gray-300 rounded-2xl">
            <Link href={`/dashboard/new`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Task1
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
                        <Link href={`/dashboard/${task.id}`}>Edit</Link>
                        |
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
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
              {children}
            </div>
          </div>
        </div>
      </Fragment>
    </>
  )
}

export default DashboardLayout