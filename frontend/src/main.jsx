import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import './index.css'
import Dashboard from './pages/Dashboard.jsx';
import ProfileManager from './pages/ProfileManager.jsx';
import Conflicts from './pages/Conflicts.jsx';
import Repairs from './pages/Repairs.jsx';
import Settings from './pages/Settings.jsx';
import Help from './pages/Help.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/profiles",
        element: <ProfileManager />,
      },
      {
        path: "/conflicts",
        element: <Conflicts />,
      },
      {
        path: "/repairs",
        element: <Repairs />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
