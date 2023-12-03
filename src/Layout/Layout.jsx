import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import rwlogo from '../assets/rwlogo.png'
import './Layout.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {fs} from '../config/config';
import { doc, getDoc} from "firebase/firestore";
function Layout() {
  const auth = getAuth();
  const [user, setUser] = React.useState('');
  const [show, setShow] = React.useState(false);
  React.useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        if(uid===String(import.meta.env.VITE_APP_ADMIN_ID)){
          setShow(true);
        }
        const snap = await  getDoc(doc(fs, "users",uid));
        if (snap.exists()) {
              setUser(snap.data().name);
        } else {
            console.log("No such document!");
        }
      } else {
        setUser(null);
      }
      if(user === null && window.location.pathname==='/addproduct'){
        window.location.href='/notfound';
      }
    }
    );
  },[])
  return (
    <div className=' w-full h-full'>
      <div className=' relative '>
        <div className=' absolute w-64 h-64 p-[-2.5rem] -top-28 -left-12 rounded-full bg-slate-300 z-[-1000] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]  from-indigo-900 to-sky-400 blur-2xl'></div>
        <div className=' absolute w-48 h-48 p-[-2.5rem] circle -top-10 left-2/4 rounded-full bg-slate-300 z-[-1000] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]  from-indigo-900 to-sky-400 blur-2xl'></div>
        <div className=' absolute w-48 h-48 p-[-2.5rem] -top-36 right-0 rounded-full bg-slate-300 z-[-1000] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]  from-indigo-900 to-sky-400 blur-2xl'></div>
        <div className=' absolute w-72 h-72 m-[2.5rem] circle top-96 left-96 rounded-full bg-slate-300 z-[-1000] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]  from-indigo-900 to-sky-400 blur-2xl'></div>
        <div className=' absolute w-48 h-48 m-[2.5rem] top-56 -right-10 rounded-full bg-slate-300 z-[-1000] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]  from-indigo-900 to-sky-400 blur-2xl'></div>
        <div className='w-full px-6 flex justify-between'> 
          <img className=' w-40 h-20 select-none' src={rwlogo} />
          <Navbar isshow={show} setshow={setShow} userName={user}/>
        </div>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Layout