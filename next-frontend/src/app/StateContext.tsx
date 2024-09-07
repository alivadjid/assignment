'use client'
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import authApi from '@/api/authApi';

const StateContext = createContext({
  user: {},
  saveUser: (userData: {}) => {userData},
  removeUser: () => {},
  token: '',
  saveToken: (token: string) => {token},
  tasks: [],
  saveTasks: (tasks: []) => {tasks},
});

const StateProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);


  const saveUser = (userData: {}) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser({});
  };

  const saveToken = (token: string) => {
    setToken(token)
  }
  const saveTasks = (tasks: []) => {
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
    if (tasks.length || token) {
      if (token) Cookies.set('isAuthenticated', 'true', { expires: 1 })
      localStorage.setItem('appState', JSON.stringify({ tasks, token }));
    }
  }, [token, tasks]);

  return (
    <StateContext.Provider value={{ user, saveUser, removeUser, token, saveToken, tasks, saveTasks }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };