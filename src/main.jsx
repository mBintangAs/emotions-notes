import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react';
import "@fontsource/quicksand"; // Import seluruh font
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './partials/SignIn.jsx'
import SignUp from './partials/SignUp.jsx'
import Dashboard from './partials/Dashboard.jsx'
import  Axios   from "axios";

Axios.defaults.baseURL="https://nxb2xkdg-8000.asse.devtunnels.ms";

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
