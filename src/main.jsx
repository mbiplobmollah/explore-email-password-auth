import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Root from './layout/Root'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children:[
      {
        index: true, 
        Component: Home
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
