import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import About from './components/Contact/Contact.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Layout from './Layout/Layout.jsx'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
import Mens from './components/Mens/Mens.jsx'
import Womens from './components/Womens/Womens.jsx'
import Goggles from './components/Goggles/Goggles.jsx'
import Accessories from './components/Accessories/Accessories.jsx'
import Contact from './components/Contact/Contact.jsx'
import ItemDetails from './components/ItemDetails/ItemDetails.jsx'
import AddProduct from './components/AddProducts/AddProduct.jsx'
import Queries from './components/Cqueries/Queries.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
    <Route path='/' element={<App/>}/>,
    <Route path='/login' element={<Login/>}/>,
    <Route path='/signup' element={<Signup/>}/>,
    <Route path='/mens' element={<Mens/>}/>,
    <Route path='/womens' element={<Womens/>}/>,
    <Route path='/goggles' element={<Goggles/>}/>,
    <Route path='/accessories' element={<Accessories/>}/>,
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/addproduct' element={<AddProduct />} />
    <Route path='/:id' element={<ItemDetails/>}/>
    <Route path='/queries' element={<Queries/>}/>
    </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
)
