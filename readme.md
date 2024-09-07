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