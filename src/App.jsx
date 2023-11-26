import { useState } from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import Home from './components/Home/Home'
import ItemDetails from './components/ItemDetails/ItemDetails'
import Accessories from './components/Accessories/Accessories'
import Womens from './components/Womens/Womens'
import Mens from './components/Mens/Mens'
import About from './components/About/About'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import AddProduct from './components/AddProducts/AddProduct'
import Queries from './components/Cqueries/Queries'

function App() {
  const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/mens' element={<Mens />} />
        <Route path='/womens' element={<Womens />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/queries' element={<Queries />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/accessories' element={<Accessories />} />
        <Route path='/:id' element={<ItemDetails/>}/>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider  router={router} />
    </>
  )
}

export default App
