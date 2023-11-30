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
    <div className=' my-6 mx-4 text-lg rounded-md bg-black/5 font-semibold shadow-xl items-center z-20 absolute right-5'>
        <ul className='flex justify-between items-center'>
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer nav-links select-none'><NavLink to='/'>Home</NavLink></li>
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer nav-links select-none'><NavLink to='/mens'>Mens</NavLink></li>
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer nav-links select-none'><NavLink to='/womens'>Womens</NavLink></li>
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer nav-links select-none'><NavLink to='/goggles'>Goggles</NavLink></li>
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer nav-links select-none'><NavLink to='/accessories'>Accessories</NavLink></li>
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer nav-links select-none'><NavLink to='/contact'>Contact</NavLink></li>
            {!userName&&<li className='px-4 py-1 hover:bg-black/10  rounded-md cursor-pointer nav-links select-none'><NavLink to='/signup'>Signup</NavLink></li>}
            {userName&&
            <>
            {isshow&&<li className='px-4 py-1 hover:bg-black/10  rounded-md cursor-pointer nav-links select-none'><NavLink to='/queries'>Queries</NavLink></li>}
            {isshow&&<li className='px-4 py-1 hover:bg-black/10  rounded-md cursor-pointer nav-links select-none'><NavLink to='/addproduct'>Add Product</NavLink></li>}
            <li onClick={handleLogout} className='px-4 py-1 hover:bg-black/10  rounded-md cursor-pointer nav-links select-none'>Logout</li>
            </>
            }
            <li className='px-4 py-1 hover:bg-black/10 rounded-md cursor-pointer text-2xl burger-links select-none'
            onClick={()=>(setBurgerItem((prev)=>!prev))}><RxHamburgerMenu/></li>
        </ul>
        <div className={`p-2 burger-links-item select-none ${burgerItem?'block':'hidden'}`}>
            <div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/'>Home</NavLink></div>
            <div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/mens'>Mens</NavLink></div>
            <div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/womens'>Womens</NavLink></div>
            <div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/goggles'>Goggles</NavLink></div>
            <div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/accessories'>Accessories</NavLink></div>
            <div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/contact'>Contact</NavLink></div>
            {!userName&&<div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/signup'>Signup</NavLink></div>}
            {userName&&
            <>
            {isshow&&<div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/queries'>Queries</NavLink></div>}
            {isshow&&<div onClick={()=>(setBurgerItem((prev)=>!prev))} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'><NavLink to='/addproduct'>Add Product</NavLink></div>}
            <div onClick={handleLogout} className='hover:bg-black/10 rounded-md cursor-pointer burger-links-item select-none'>Logout</div>
            </>
            }
        </div>
    </div>
  )
}

export default Navbar