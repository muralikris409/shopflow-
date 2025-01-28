"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store';
export default function StoreProvider({children}) {
    const store=makeStore();

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
