import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './lib/store'
import Root from './Root'
import './index.css'

const ErrorBoundary = () => {
  const error = useRouteError()
  console.error(error)
  return <div>{error.statusText ?? error.message}</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            lazy: () => import('./routes/Home')
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router}/>
    </ReduxProvider>
  </React.StrictMode>,
)
