import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from './lib/router';
const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
