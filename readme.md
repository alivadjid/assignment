
# Assignment

## For start needs docker-compose to be install

All request you can get from postman collection [postman-collection](./Assignment variable.postman_collection.json) file

1. Clone repository
2. In nest-backend folder run `npm i`
3. In next-frontend folder run `npm i`
4. Now start docker-compose from root folder `docker-compose up`

```
docker-compose up
docker-compose up --build
```
go to localhost:3001 -> login -> sign up

After register it will redirect to login page

After login it will redirect to dashboard page

On the dashboard you can see all tasks and chart with statuses

You can add new task, edit and delete tasks.

For logout choose -> profile picture -> logout

- [x] add containers
- [x] nest: db connect
- [x] nest: authorization/registration
- [x] nest: task entity
- [x] nest: auth guard

- [x] next: login page
- [x] next: registration page
- [x] next: dashboard
- [x] next: api bind
- [x] next: route guard
- [x] next: chart
- [x] next: validation

#### summary example
```json
{
  "totalTasks": 100,
  "completedTasks": 40,
  "pendingTasks": 60,
  "tasksByStatus": {
    "inProgress": 20,
    "onHold": 10,
    "cancelled": 5
  }
}
```