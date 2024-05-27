import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Form from './components/Form.jsx';
import Home from './components/Home.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Form />} />
      <Route index={true} path="/home" element={<Home />} />
    </Route>
  )
);
const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <RouterProvider router={router} />
);
