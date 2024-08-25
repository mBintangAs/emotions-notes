import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react';
import "@fontsource/quicksand/700.css"; // Import seluruh font
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './partials/SignIn.jsx'
import SignUp from './partials/SignUp.jsx'
import Dashboard from './partials/Dashboard.jsx'
import  Axios   from "axios";
import AddNotes from './partials/AddNotes.jsx';
import CalendarPage from './partials/CalendarPage.jsx';
import EditNotes from './partials/EditNotes.jsx';


Axios.defaults.baseURL="http://localhost:8000";
// Axios.defaults.baseURL="http://10.214.109.169:8000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>,
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/add",
    element: <AddNotes/>,
  },
  {
    path: "/calendar",
    element: <CalendarPage/>,
  },
  {
    path: "/journal/:id",
    element: <EditNotes/>,
  },

]);
const customTheme= extendTheme({
  colors: {
    mint: '#B2CDD4',  // Warna custom utama
    pinkPastel: '#F2D9CD',  // Warna custom lainnya
    purplePastel: '#ACB0CA',  // Warna custom lainnya
    offWhite: '#EDEDED',  // Warna custom lainnya
    darkBlue: '#1E2A5E',  // Warna custom lainnya
  },
  fonts: {
    heading: "Quicksand, sans-serif",
    body: "Quicksand, sans-serif",
  },
})

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
)
