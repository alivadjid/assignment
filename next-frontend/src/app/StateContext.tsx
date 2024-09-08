'use client'
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import authApi from '@/api/authApi';
import type { TaskApi } from '../../pages/api/tasks/list'

const StateContext = createContext({
  user: {username: ''},
  saveUser: (userData: {username: string}) => {userData},
  removeUser: () => {},
  token: '',
  saveToken: (token: string) => {token},
  tasks: [{title: '', dueDate: '', id: ''}],
  saveTasks: (tasks: TaskApi[]) => {tasks},
  removeToken: () => {},
});

const StateProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState({username: ''});
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState<TaskApi[]>([]);

  const saveUser = (userData: {username: string}) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser({username: ''});
  };

  const saveToken = (token: string) => {
    setToken(token)
  }
  const removeToken = () => {
    setToken('')
  }
  const saveTasks = (tasks: TaskApi[]) => {
    setTasks(tasks)
  }

  useEffect(() => {
    const storedData = localStorage.getItem('appState');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setToken(parsedData.token);
      setTasks(parsedData.tasks);

      if (parsedData.token) {
        Cookies.set('isAuthenticated', 'true', { expires: 1 })
        authApi.getUser(parsedData.token).then((data) => setUser(data))
      }
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(tasks) && tasks.length || token) {
      if (token) Cookies.set('isAuthenticated', 'true', { expires: 1 })
      localStorage.setItem('appState', JSON.stringify({ tasks, token }));
    }
  }, [token, tasks]);

  return (
    <StateContext.Provider value={{ user, saveUser, removeUser, token, saveToken, tasks, saveTasks, removeToken }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };