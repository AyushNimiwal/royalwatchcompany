import React from 'react'
import './Navbar.css'
import { RxHamburgerMenu } from "react-icons/rx";
import {NavLink} from "react-router-dom";
import { getAuth} from "firebase/auth";

function Navbar({ userName, isshow, setshow }) {
  const [burgerItem, setBurgerItem] = React.useState(false);
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setshow(false);
      window.location.assign("/");
    });
  };
  return (
    <div className='my-6 mx-4'>
        <ul className='flex justify-between items-center'>
             <li className='px-4 py-1 hover:text-orange-400 rounded-md cursor-pointer nav-links select-none'><NavLink to='/'>Home</NavLink></li>
             <li className='px-4 py-1 hover:text-orange-400 rounded-md cursor-pointer nav-links select-none'><NavLink to='/mens'>Categories</NavLink></li>
             <li className='px-4 py-1 hover:text-orange-400 rounded-md cursor-pointer nav-links select-none'><NavLink to='/accessories'>Accessories</NavLink></li>
            {!userName&&<li className='px-4 py-1 hover:text-orange-400  rounded-md cursor-pointer nav-links select-none'><NavLink to='/signup'>Signup</NavLink></li>}
             {userName&&
            <>
            {isshow&&<li className='px-4 py-1 hover:text-orange-400 rounded-md cursor-pointer nav-links select-none'><NavLink to='/addproduct'>Add Product</NavLink></li>}
            <li onClick={handleLogout} className='px-4 py-1 hover:text-orange-400  rounded-md cursor-pointer nav-links select-none'>Logout</li>
            </>
            }
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer text-2xl burger-links select-none'
            onClick={()=>(setBurgerItem((prev)=>!prev))}><RxHamburgerMenu/></li>
        </ul>
        <div className={`absolute p-2 bg-gray-500/70 rounded-md right-4 burger-links-item select-none ${burgerItem?'block':'hidden'}`}>
        <div onClick={()=>(setBurgerItem((prev)=>!prev))} className=' rounded-md hover:bg-gray-600/50 p-1 cursor-pointer burger-links-item select-none'><NavLink to='/'>Home</NavLink></div>
        <div onClick={()=>(setBurgerItem((prev)=>!prev))} className=' rounded-md hover:bg-gray-600/50 p-1 cursor-pointer burger-links-item select-none'><NavLink to='/mens'>Categories</NavLink></div>
        <div onClick={()=>(setBurgerItem((prev)=>!prev))} className=' rounded-md hover:bg-gray-600/50 p-1 cursor-pointer burger-links-item select-none'><NavLink to='/accessories'>Accessories</NavLink></div>
          {!userName&&<div onClick={()=>(setBurgerItem((prev)=>!prev))} className=' rounded-md hover:bg-gray-600/50 p-1 cursor-pointer burger-links-item select-none'><NavLink to='/signup'>Signup</NavLink></div>}
          {userName&&
            <>
            {isshow&&<div onClick={()=>(setBurgerItem((prev)=>!prev))} className=' rounded-md hover:bg-gray-600/50 p-1 cursor-pointer burger-links-item select-none'><NavLink to='/addproduct'>Add Product</NavLink></div>}
            <div onClick={handleLogout} className=' rounded-md hover:bg-gray-600/50 p-1 cursor-pointer burger-links-item select-none'>Logout</div>
            </>
          }
        </div>
    </div>
  )
}

export default Navbar