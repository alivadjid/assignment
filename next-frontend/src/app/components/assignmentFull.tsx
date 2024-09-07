
import { Fragment } from 'react'
const AssignmentFull = () => {
  return (<Fragment>
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task Assignment</h1>
      </div>
    </header>
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Assignment: Fullstack Developer</h1>
      <h2 className="text-2xl font-bold mb-4">Task: Develop a Task Management Application with Dashboard</h2>
      <p className="text-lg mb-4">Objective: Create a task management application where users can create, read, update, and delete (CRUD) tasks. The application should have a NestJS back-end and a Next.js front-end, a dashboard for an overview of all the tasks, a task page to visualize the details of the current selected task.</p>

      <h3 className="text-2xl font-bold mb-2">Back-End: NestJS</h3>
      <h4 className="text-xl font-bold mb-2">Requirements:</h4>
      <ol className="list-decimal pl-4 mb-4">
        <li className="mb-2">
          Project Setup:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Set up a NestJS project using the Nest CLI.</li>
            <li className="mb-1">Create a RESTful API with endpoints for managing tasks (CRUD operations).</li>
          </ul>
        </li>
        <li className="mb-2">
          Task Entity:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Define a Task entity with fields: id, title, description, dueDate, and status (e.g., pending, in-progress, completed).</li>
          </ul>
        </li>
        <li className="mb-2">
          Endpoints:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Create Task: POST /tasks</li>
            <li className="mb-1">Get All Tasks (optional): GET /tasks</li>
            <li className="mb-1">Get Task by ID (optional): GET /tasks/:id</li>
            <li className="mb-1">Update Task (optional): PUT /tasks/:id</li>
            <li className="mb-1">Delete Task (optional): DELETE /tasks/:id</li>
            <li className="mb-1">Get Task Summary: GET /tasks/summary (for dashboard statistics like total tasks, completed tasks, pending tasks, etc.)</li>
          </ul>
        </li>
        <li className="mb-2">
          Database Integration:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Use TypeORM or another ORM to interact with a MonogDB database (or any preferred database).</li>
            <li className="mb-1">Ensure proper validation and error handling.</li>
          </ul>
        </li>
        <li className="mb-2">
          Authentication (Bonus):
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Implement JWT-based authentication to protect task routes.</li>
          </ul>
        </li>
      </ol>

      <h4 className="text-xl font-bold mb-2">Evaluation Criteria:</h4>
      <ul className="list-disc pl-4 mb-4">
        <li className="mb-1">Code structure and organization.</li>
        <li className="mb-1">Correctness and completeness of endpoints.</li>
        <li className="mb-1">Proper use of NestJS modules, controllers, and services.</li>
        <li className="mb-1">Handling of edge cases and errors.</li>
        <li className="mb-1">Implementation of authentication (if attempted).</li>
      </ul>

      <h3 className="text-2xl font-bold mb-2">Front-End: Next.js</h3>
      <h4 className="text-xl font-bold mb-2">Requirements:</h4>
      <ol className="list-decimal pl-4 mb-4">
        <li className="mb-2">
          Project Setup:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Set up a Next.js project using Create Next App.</li>
            <li className="mb-1">Create pages for displaying tasks, managing tasks (CRUD operations), and a dashboard.</li>
          </ul>
        </li>
        <li className="mb-2">
          Dashboard:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Dashboard Page: Display an overview of tasks with statistics (e.g., total tasks, completed tasks, pending tasks, tasks due soon).</li>
            <li className="mb-1">Use charts or graphs to visualize the data (e.g., using Chart.js or Recharts).</li>
          </ul>
        </li>
        <li className="mb-2">
          Task Management:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Home Page: Display a list of tasks with options to edit or delete each task.</li>
            <li className="mb-1">Add Task Page: Provide a form to create a new task.</li>
            <li className="mb-1">Edit Task Page (optional): Provide a form to update an existing task.</li>
            <li className="mb-1">Task Detail Page (Bonus): Display details of a single task.</li>
          </ul>
        </li>
        <li className="mb-2">
          API Integration:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Use Axios or Fetch API to interact with the NestJS back-end.</li>
            <li className="mb-1">Handle loading states, success, and error messages.</li>
          </ul>
        </li>
        <li className="mb-2">
          State Management:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Use React Context API or any state management library (e.g., Redux) to manage the state.</li>
          </ul>
        </li>
        <li className="mb-2">
          Styling:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Use CSS Modules, styled-components, or any CSS framework to style the application.</li>
          </ul>
        </li>
        <li className="mb-2">
          Authentication (Bonus):
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Implement authentication flow (login, register) and protect routes accordingly.</li>
          </ul>
        </li>
      </ol>

      <h4 className="text-xl font-bold mb-2">Evaluation Criteria:</h4>
      <ul className="list-disc pl-4 mb-4">
        <li className="mb-1">Clean and responsive UI design.</li>
        <li className="mb-1">Correctness of API integration and state management.</li>
        <li className="mb-1">Code structure and modularity.</li>
        <li className="mb-1">Handling of edge cases and errors.</li>
        <li className="mb-1">Implementation of authentication and protected routes (if attempted).</li>
      </ul>

      <h3 className="text-2xl font-bold mb-2">Instructions:</h3>
      <ol className="list-decimal pl-4 mb-4">
        <li className="mb-2">
          Setup Repositories:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Create 1 docker compose file to run the 2 applications, the NestJS back-end and Next.js front-end.</li>
            <li className="mb-1">Provide clear README files with setup instructions.</li>
          </ul>
        </li>
        <li className="mb-2">
          Submission:
          <ul className="list-disc pl-4 mb-2">
            <li className="mb-1">Submit the GitHub repositories along with any additional notes on their implementation.</li>
            <li className="mb-1">A short demo video explaining their approach and any challenges faced.</li>
          </ul>
        </li>
      </ol>

      <h3 className="text-2xl font-bold mb-2">Timeframe:</h3>
      <p className="text-lg mb-4">5-7 days to complete the task, considering the added complexity of using both NestJS and Next.js.</p>
    </div>
  </Fragment>)
};

export default AssignmentFull;