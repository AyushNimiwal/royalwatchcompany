import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {fs} from '../config/config';
import { doc, getDoc} from "firebase/firestore";
import Footer from '../components/Footer/Footer';
import rwlogo from '../assets/rwlogo.png'
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
        <>
        <div className='flex justify-between bg-gradient-to-r from-black via-gray-900 to-gray-700 shadow-xl'>
          <img src={rwlogo} className='w-36 h-20 ml-4 '/>
          <Navbar isshow={show} setshow={setShow} userName={user}/>
        </div>
          <Outlet/>
          <Footer/>
        </>
        
  )
}

export default Layout