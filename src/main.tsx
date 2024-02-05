import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './root/rootLayout.tsx'
import Calendar from './routes/calendar/index.tsx'

const browserRouter = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  children: [{
    path: 'calendar/:calendarId',
    element: <Calendar />,
  }]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>,
)
