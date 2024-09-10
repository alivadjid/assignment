# Instruction
```sh
docker-compose up

docker-compose up --build
```

- [ ] add containers
- [ ] nest: db connect
- [ ] nest: authorization/registration
- [ ] nest: task entity
- [ ] nest: auth guard
- [ ] next: login page
- [ ] next: dashboard

- [ ] next: api bind
- [ ] next: route guard

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

# Assignment

## For start needs docker-compose to be install

All request you can get from postman collection [postman-collection](./Assignment variable.postman_collection.json) file

```
docker-compose up --build
```
go to localhost:3001 -> login -> register

After register it will redirect to login page

After login it will redirect to dashboard

On the dashboard you can see all tasks and chart with statuses

You can add new task, edit and delete tasks.

For logout choose -> profile picture -> logout

