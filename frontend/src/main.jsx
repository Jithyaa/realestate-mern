import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import AdminRoutes from './routes/AdminRoutes.jsx';
import UserRoutes from './routes/UserRoutes.jsx'
import { QueryClient, QueryClientProvider } from 'react-query';



const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      
      <Route  index={true} path='/' element={<UserRoutes/>} />

      <Route  index={true} path='/*' element={<UserRoutes/>} />
 
    
      <Route path='/admin/*' element={<AdminRoutes/>} />
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  </Provider>
);
