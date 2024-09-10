'use client'
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import authApi from '@/api/authApi';

const StateContext = createContext({
  user: {username: ''},
  saveUser: (userData: {username: string}) => {userData},
  removeUser: () => {},
  token: '',
  saveToken: (token: string) => {token},
  removeToken: () => {},
});

const StateProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState({username: ''});
  const [token, setToken] = useState('');

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
 

  useEffect(() => {
    const storedData = localStorage.getItem('appState');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setToken(parsedData.token);

      if (parsedData.token) {
        Cookies.set('isAuthenticated', 'true', { expires: 1 })
        authApi.getUser(parsedData.token).then((data) => setUser(data))
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (token) Cookies.set('isAuthenticated', 'true', { expires: 1 })
      localStorage.setItem('appState', JSON.stringify({ token }));
    }
  }, [token]);

  return (
    <StateContext.Provider value={{ user, saveUser, removeUser, token, saveToken, removeToken }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };